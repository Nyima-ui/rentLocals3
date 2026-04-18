"use server";
import { createClient } from "./supabase/server";

export const fetchHomeListingsAction = async (): Promise<Listing[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("listings").select("*");

  if (error) throw error;

  return data;
};

const uploadImageToStorage = async (
  validPictures: File[],
  userId: string,
  listingId: string,
): Promise<string[]> => {
  const supabase = await createClient();
  const pictureUrls: string[] = [];
  for (let i = 0; i < validPictures.length; i++) {
    const file = validPictures[i];
    const ext = file.name.split(".").pop();
    const filePath = `${userId}/${listingId}/${i}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("listing-images")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("listing-images").getPublicUrl(filePath);

    pictureUrls.push(publicUrl);
  }

  return pictureUrls;
};

export const createListingAction = async (
  formData: FormData,
  userId: string,
) => {
  const supabase = await createClient();

  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const priceDay = Number(formData.get("price-day"));
  const priceWeek = Number(formData.get("price-week"));
  const pictures = formData.getAll("picture") as File[];
  const validPictures = pictures.filter((file) => file.size > 0);

  const { data: listing, error } = await supabase
    .from("listings")
    .insert({
      owner_id: userId,
      category,
      title,
      description,
      location,
      pictures,
      price_day: priceDay,
      price_week: priceWeek,
    })
    .select("id")
    .single();

  if (error) throw error;

  const pictureUrls = await uploadImageToStorage(
    validPictures,
    userId,
    listing.id,
  ).catch(async (err) => {
    await supabase.from("listings").delete().eq("id", listing.id);
    throw err;
  });

  const { error: updateError } = await supabase
    .from("listings")
    .update({ pictures: pictureUrls })
    .eq("id", listing.id);

  if (updateError) throw updateError;

  return { success: true };
};

export const fetchListingByIdAction = async (
  listingId: string,
): Promise<SingleListing> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*, owner:profiles!listings_owner_id_fkey(fullname, avatar)")
    .eq("id", listingId)
    .single();

  if (error) throw error;

  return data;
};

export const fetchExistingBooking = async (
  payload: ExistingBookingPayload,
): Promise<string | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("booking")
    .select("id")
    .eq("renter_id", payload.renter_id)
    .eq("listing_id", payload.listing_id)
    .eq("owner_id", payload.owner_id)
    .in("status", ["pending", "accepted", "active"])
    .maybeSingle();

  if (error) throw error;

  if (data) {
    return data.id;
  }

  return null;
};

export const chatAction = async (payload: MessagePayload) => {
  const supabase = await createClient();

  const { error } = await supabase.from("chat").insert(payload);

  if (error) throw error;
};

export const requestBookingAction = async (
  bookingPayload: BookingPayload,
): Promise<string> => {
  const supabase = await createClient();

  const existingBookingPayload: ExistingBookingPayload = {
    renter_id: bookingPayload.renter_id,
    owner_id: bookingPayload.owner_id,
    listing_id: bookingPayload.listing_id,
  };

  const existingBookingId = await fetchExistingBooking(existingBookingPayload);

  if (existingBookingId) {
    return existingBookingId;
  }

  const { data, error } = await supabase
    .from("booking")
    .insert(bookingPayload)
    .select("id")
    .single();

  if (error) throw error;

  await chatAction({
    booking_id: data.id,
    sender_id: bookingPayload.renter_id,
    receiver_id: bookingPayload.owner_id,
    listing_id: bookingPayload.listing_id,
    message: "booking_requested",
    type: "system",
  });

  return data.id;
};

export const fetchBookingAction = async (id: string): Promise<Booking> => {
  const supabase = await createClient();

  const { error, data: booking } = await supabase
    .from("booking")
    .select(
      `
    *,
    listing:listing_id (
      title,
      pictures
    ),
    owner:owner_id (
      fullname,
      avatar
    ),
    renter:renter_id (
      fullname,
      avatar
    ),
    status_history:booking_status_history (
      id,
      status,
      created_at
    )
  `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return booking;
};

export const fetchChatMessagesAction = async (bookingId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chat")
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
};

export const fetchListingAddress = async (listingId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("location")
    .eq("id", listingId)
    .single();

  if (error) throw error;

  return data.location;
};

export const ownerAcceptAction = async (booking: Booking) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("booking")
    .update({ status: "accepted" })
    .eq("id", booking.id)
    .select()
    .single();

  if (error) throw error;

  const message: MessagePayload = {
    booking_id: booking.id,
    sender_id: booking.owner_id,
    receiver_id: booking.renter_id,
    listing_id: booking.listing_id,
    message: "booking_accepted",
    type: "system",
  };

  await chatAction(message);

  return data;
};

export const ownerDeclineAction = async (
  booking: Booking,
): Promise<Booking> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("booking")
    .update({ status: "declined" })
    .eq("id", booking.id)
    .select()
    .single();

  await chatAction({
    booking_id: booking.id,
    sender_id: booking.owner_id,
    receiver_id: booking.renter_id,
    listing_id: booking.listing_id,
    message: "booking_declined",
    type: "system",
  });

  if (error) throw error;

  return data;
};

export const renterCancelAction = async (booking: Booking) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("booking")
    .update({ status: "cancelled" })
    .eq("id", booking.id);

  await chatAction({
    booking_id: booking.id,
    sender_id: booking.owner_id,
    receiver_id: booking.renter_id,
    listing_id: booking.listing_id,
    message: "booking_cancelled",
    type: "system",
  });

  if (error) throw error;
};

export const fetchUserListings = async (
  ownerId: string,
): Promise<Listing[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("owner_id", ownerId);

  if (error) throw error;

  return data ?? [];
};
