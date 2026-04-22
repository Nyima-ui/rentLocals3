import React from "react";

const loading = () => {
  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5 mt-13.5 max-md:mt-21.5">
      <div className="flex gap-8 h-[80vh] max-lg:flex-col">
        <div className="flex-1 flex gap-5">
          <div className="rounded-md bg-primary-100/50 flex-1 cardLoader overflow-hidden relative"></div>
          <div className="flex flex-col justify-end gap-5">
            <div className="w-18 h-13.5 bg-primary-200/20 cardLoader overflow-hidden relative rounded-md"></div>
            <div className="w-18 h-13.5 bg-primary-200/20 cardLoader overflow-hidden relative rounded-md"></div>
            <div className="w-18 h-13.5 bg-primary-200/20 cardLoader overflow-hidden relative rounded-md"></div>
          </div>
        </div>
        <div className="cardLoader overflow-hidden relative rounded-md bg-primary-100/50 flex-1"></div>
      </div>
    </div>
  );
};

export default loading;
