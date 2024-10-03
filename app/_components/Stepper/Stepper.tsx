import { useEffect, Fragment, useState } from "react";
import StepItem from "./StepItem";

interface StepperProps {
  data: {
    [key: string]: any;
  }[];
  currentStep: number;
  onNext: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

const Stepper = ({
  data,
  currentStep,
  onNext,
  onSubmit,
  onBack,
}: StepperProps) => {
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if (currentStep === data.length) setIsComplete(true);
  }, [data, currentStep]);
  return (
    <div>
      <div className="flex items-center w-full justify-center m-6 px-6 mt-20">
        {data.slice(0, 4).map((step, index, arr) => (
          <div key={step.id} className="flex items-center">
            <StepItem
              id={step.id}
              title={step.title}
              currentStep={currentStep}
            />
            {index < arr.length - 1 && (
              <div className="h-4 w-12 bg-red-700"></div>
            )}
          </div>
        ))}
      </div>
      <div className="my-4">
        {!isComplete && (
          <button
            type="button"
            className="home-link rounded py-3"
            onClick={onNext}
          >
            {currentStep === data.length ? "Finish" : "Next"} ➡️
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
