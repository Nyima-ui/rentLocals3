import { cn } from "@/lib/utils"

const CtaButton = ({text}: {text: string}) => {
  return (
     <button className={cn(`bg-primary px-[15px] py-[10px] rounded-md cursor-pointer text-sm font-medium text-bg-main`)}>
          {text}
     </button>
  )
}

export default CtaButton