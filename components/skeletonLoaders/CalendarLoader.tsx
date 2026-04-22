

const CalendarLoader = () => {
  return (
    <div className="w-85 cardLoader overflow-hidden relative flex flex-col rounded-md bg-primary-100/50 p-4 justify-between mt-8">
        <div className="h-7 bg-primary-200 opacity-20 rounded-md"></div>
        <div className="h-5 mt-5 bg-primary-200 opacity-20 rounded-md"></div>
      <ul className="flex flex-col gap-2 mt-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="bg-primary-200 opacity-20 rounded-md h-10"
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarLoader;
