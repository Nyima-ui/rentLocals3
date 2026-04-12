import { CircleCheckBig, Circle, XCircle } from "lucide-react";

type BookingStatus =
  | "pending"
  | "accepted"
  | "active"
  | "returned"
  | "cancelled"
  | "declined";

const STEPS: { label: string; status: BookingStatus }[] = [
  { label: "Pending", status: "pending" },
  { label: "Accepted", status: "accepted" },
  { label: "Active", status: "active" },
  { label: "Returned", status: "returned" },
];

type DisplayStep =
  | { type: "normal"; label: string; status: BookingStatus; stepIndex: number }
  | { type: "cancel"; label: string };

const StepIndicator = ({
  status,
  statusHistory,
}: {
  status: BookingStatus;
  statusHistory: { status: BookingStatus }[];
}) => {
  const isCancelled = status === "cancelled" || status === "declined";
  const completedStatuses = new Set(statusHistory.map((h) => h.status));

  const cancelAfterIndex = isCancelled
    ? Math.max(
        ...STEPS.map((s, idx) =>
          completedStatuses.has(s.status) ? idx : -1,
        ).filter((idx) => idx !== -1),
      )
    : -1;

  const displaySteps: DisplayStep[] = [];
  STEPS.forEach((step, idx) => {
    displaySteps.push({ type: "normal", ...step, stepIndex: idx });
    if (isCancelled && idx === cancelAfterIndex) {
      displaySteps.push({
        type: "cancel",
        label: status === "declined" ? "Declined" : "Cancelled",
      });
    }
  });

  const currentIndex = isCancelled
    ? cancelAfterIndex
    : STEPS.findIndex((s) => s.status === status);
    
  return (
    <div className="flex items-center relative">
      <div className="absolute h-0.5 w-full bg-text/30 top-2.5"></div>
      <div className="flex w-full relative z-10 justify-around">
        {displaySteps.map((step, idx) => {
          if (step.type === "cancel") {
            return (
              <div className="flex flex-col items-center" key="cancel">
                <XCircle size={20} color="#FF6242" fill="#fff5f0" />
                <span className="text-text text-sm">{step.label}</span>
              </div>
            );
          }

          const isCompleted = step.stepIndex <= currentIndex;
          return (
            <div className="flex flex-col items-center" key={step.status}>
              {isCompleted ? (
                <CircleCheckBig size={20} color="#FF6242" fill="#fff5f0" />
              ) : (
                <Circle size={20} color="#FF6242" fill="#fff5f0" />
              )}
              <span className="text-text text-sm">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
