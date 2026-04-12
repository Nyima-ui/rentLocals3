import OwnerBookingInterface from "@/components/OwnerBookingInterface";
import RenterBookingInterface from "@/components/RenterBookingInterface";
import { fetchBookingAction } from "@/lib/action";
import { createClient } from "@/lib/supabase/server";

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabae = await createClient();

  const [
    {
      data: { user },
    },
    booking,
  ] = await Promise.all([supabae.auth.getUser(), fetchBookingAction(id)]);

  const isOwner = booking.owner_id === user?.id;

  console.log(booking)

  return (
    <main className="px-20 max-lg:px-10 max-sm:px-5 border">
      {isOwner ? (
        <OwnerBookingInterface />
      ) : (
        <RenterBookingInterface booking={booking}/>
      )}
    </main>
  );
};

export default BookingPage;
