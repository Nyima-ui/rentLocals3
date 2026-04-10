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
): Promise<Listing> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", listingId)
    .single();

  if (error) throw error;

  return data;
};
