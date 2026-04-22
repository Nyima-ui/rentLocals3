import BackButton from "@/components/BackButton";
import CardLoader from "@/components/skeletonLoaders/cardLoader/CardLoader";

const loading = () => {
  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5">
      <BackButton classname="mt-7 max-md:mt-20" />
      <h1 className="text-[27px] mt-6">My listings</h1>

      <ul className="grid grid-cols-5 gap-x-3.75 gap-y-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mt-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardLoader key={i} />
        ))}
      </ul>
    </div>
  );
};

export default loading;
