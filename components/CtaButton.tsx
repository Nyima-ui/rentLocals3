import { cn } from "@/lib/utils";

const CtaButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        `bg-primary px-[15px] py-[10px] rounded-md cursor-pointer text-sm font-medium text-bg-main`, className
      )}
    >
      {text}
    </button>
  );
};

export default CtaButton;
