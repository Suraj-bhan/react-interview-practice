interface Step {
  id: number;
  title: string;
  description: string;
  currentStep: number;
  isComplete: boolean;
}

const StepItem = ({
  id,
  title,
  description,
  currentStep,
  isComplete,
}: Step) => {
  return (
    <div className="flex flex-col items-center">
      <div className="step">
        {id}
      </div>
      <div>{title}</div>
    </div>
  );
};

export default StepItem;
