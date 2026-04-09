import { cn } from "@/lib/utils";

const CtaButton = ({
  text,
  className,
  ...props
}: {
  text: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `bg-primary px-[15px] py-[10px] rounded-md cursor-pointer text-sm font-medium text-bg-main`,
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default CtaButton;
