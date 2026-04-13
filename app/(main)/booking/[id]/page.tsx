import OwnerBookingInterface from "@/components/OwnerBookingInterface";
import RenterBookingInterface from "@/components/RenterBookingInterface";
import { fetchBookingAction } from "@/lib/action";
import { createClient } from "@/lib/supabase/server";
import Footer from "@/components/Footer";

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

  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5">
      <main>
        {isOwner ? (
          <OwnerBookingInterface booking={booking}/>
        ) : (
          <RenterBookingInterface booking={booking} />
        )}
      </main>
      <Footer classname="max-lg:hidden"/>
    </div>
  );
};

export default BookingPage;
