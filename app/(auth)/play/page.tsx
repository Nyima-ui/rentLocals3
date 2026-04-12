import StepIndicator from "@/components/StepIndicator";
import { CircleCheckBig } from "lucide-react";
import { Circle } from "lucide-react";

const page = () => {
  return (
    <section className="flex justify-center items-center h-[80vh]">
      <StepIndicator
        status={"cancelled"}
        statusHistory={[{ status: "pending" }, { status: "cancelled" }]}
      />
    </section>
  );
};

export default page;
