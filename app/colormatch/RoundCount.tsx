interface RoundCountProps {
  roundCount: number;
  reset: () => void;
}

const RoundCount = ({ roundCount, reset }: RoundCountProps) => {
  return (
    <div className="flex flex-col p-24 w-full items-center transition-all delay-1000">
      <div className="text-4xl w-full py-16 px-36 rounded-xl bg-green-500 text-white">
        {" "}
        {roundCount}
      </div>
      <button
        type="button"
        className="bg-blue-500 border border-blue-600 hover:bg-blue-700 px-6 py-4 w-[200px] rounded-md mt-6 text-white"
        onClick={reset}
      >
        Reset Game
      </button>
    </div>
  );
};

export default RoundCount;
