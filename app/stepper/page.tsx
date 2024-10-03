"use client";
import { stepsData } from "@/constant/data";
import { useState } from "react";
import Stepper from "../_components/Stepper/Stepper";

const StepperPage = () => {
  const [data] = useState(stepsData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep !== data.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (currentStep !== 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleSubmit = () => {};

  return (
    <div className="page ">
      <Stepper
        data={data}
        currentStep={currentStep}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </div>
  );
};

export default StepperPage;
