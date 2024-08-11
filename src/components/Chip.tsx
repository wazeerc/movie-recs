import ResetIcon from "./IconButton";
import "./styles/Chip.css";

interface ChipProps {
  selectedMovies: string;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ selectedMovies, onDelete }) => {
  return (
    <>
      <div className="chip">
        <label>{selectedMovies}</label>
        <ResetIcon
          state="active"
          color="#89b4fa"
          size={20}
          onreset={() => onDelete()}
          icon="clear"
        />
      </div>
    </>
  );
};

export default Chip;
