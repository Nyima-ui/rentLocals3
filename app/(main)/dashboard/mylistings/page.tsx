import BackButton from "@/components/BackButton";
import MylistingsGrid from "@/components/MylistingsGrid";
import { createClient } from "@/lib/supabase/server";
import { fetchUserListings } from "@/lib/action";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import Link from "next/link";

const MyListings = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signup");

  const userListings = await fetchUserListings(user.id);

  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5">
      <BackButton classname="mt-7 max-md:mt-20" />
      {userListings.length > 0 ? (
        <>
          <h1 className="text-[27px] mt-6">My listings</h1>
          <MylistingsGrid listings={userListings} />
        </>
      ) : (
        <div className="h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image
              height={84}
              width={78}
              alt="Note illustration"
              src={"/note.svg"}
            />
            <h1 className="font-syne text-[27px]">No listings yet</h1>
            <p className="max-w-[384px] text-center leading-tight text-text/60 text-sm mt-2">
              You haven&apos;t created any listings. Share something you own and
              start earning today.
            </p>
            <Link href="/listing/new">
              <CtaButton text="List Your First Item" className="mt-4" />
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyListings;
