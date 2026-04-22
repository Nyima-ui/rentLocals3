import BackButton from "@/components/BackButton";

const loading = () => {
  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5">
      <BackButton classname="mt-7 max-md:mt-20" />
      <h1 className="text-[27px] mt-6">My rentals</h1>

      <ul className="mt-8 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="cardLoader overflow-hidden relative flex rounded-md bg-primary-100/50 p-3 gap-3"
          >
            <div className="size-11.25 bg-primary-200 opacity-20 rounded-full"></div>
            <div className="flex-1">
              <div className="h-7.5 bg-primary-200 opacity-20 flex-1"></div>
              <div className="h-6 bg-primary-200 opacity-20 flex-1 mt-1"></div>
              <div className="h-9.5 bg-primary-200 opacity-20 w-37.5 mt-2"></div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default loading;
