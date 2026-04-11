import { cn } from "@/lib/utils";

const CtaButton = ({
  text,
  className,
  loading,
  disabled,
  ...props
}: {
  text: string;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `bg-primary px-[15px] py-[10px] rounded-md cursor-pointer text-sm font-medium text-bg-main flex items-center justify-center gap-3`,
        loading && "bg-primary-400 cursor-not-allowed border-primary border",
        className, disabled && "bg-primary-400 cursor-not-allowed"
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <span className="size-6 border-3 border-primary-200 border-b-transparent rounded-full inline-block animate-spin"></span>
      )}
      {text}
    </button>
  );
};

export default CtaButton;
