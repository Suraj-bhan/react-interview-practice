"use client";

import { stepsData } from "@/constant/data";
import StepItem from "../_components/Stepper/StepItem";
import { useState } from "react";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {};

  return (
    <div className="page ">
      <div className="flex items-center w-full justify-between m-6 px-6 mt-20">
        {stepsData.slice(0, 5).map((step) => (
          <StepItem
            key={step.id}
            {...step}
            currentStep={currentStep}
            isComplete={isComplete}
          />
        ))}
      </div>
      <div className="my-4">
        {!isComplete && (
          <button
            type="button"
            className="home-link rounded py-3"
            onClick={handleNext}
          >
            {currentStep === stepsData.length ? "Finish" : "Next"} ➡️
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
