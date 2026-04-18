import BackButton from "@/components/BackButton";
import MylistingsGrid from "@/components/MylistingsGrid";
import { createClient } from "@/lib/supabase/server";
import { fetchUserListings } from "@/lib/action";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

const MyListings = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signup");

  const userListings = await fetchUserListings(user.id);

  return (
    <div className="px-[80px] max-lg:px-[40px] max-sm:px-[20px]">
      <BackButton classname="mt-7 max-md:mt-20" />
      <h1 className="text-[27px] mt-6">My listings</h1>
      <MylistingsGrid listings={userListings} />
      <Footer />
    </div>
  );
};

export default MyListings;
