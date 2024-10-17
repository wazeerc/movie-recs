import ResetIcon from "./IconButton";
import "./styles/Chip.css";

interface ChipProps {
  selectedMovie: string;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ selectedMovie, onDelete }) => {
  return (
    <div className="chip" aria-label={selectedMovie}>
      <span className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        {selectedMovie}
      </span>
      <ResetIcon state="active" color="#89b4fa" size={20} onreset={() => onDelete()} icon="clear" />
    </div>
  );
};

export default Chip;
