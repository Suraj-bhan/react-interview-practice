import Grid from "./Grid";

const GRID_SIZE = 12;
//should be multiple of 4

const ColorMatchGame = () => {
  return (
    <div className="page">
      <Grid size={GRID_SIZE} />
    </div>
  );
};

export default ColorMatchGame;
