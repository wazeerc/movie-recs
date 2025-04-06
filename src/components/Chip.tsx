import ResetIcon from "./IconButton";
import "./styles/Chip.css";

interface ChipProps {
  selectedMovieTitle: string;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ selectedMovieTitle, onDelete }) => {
  return (
    <div className="chip" aria-label={selectedMovieTitle}>
      <span className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:max-w-48 sm:text-sm">
        {selectedMovieTitle}
      </span>
      <ResetIcon state="active" color="#89b4fa" size={20} onReset={() => onDelete()} icon="clear" />
    </div>
  );
};

export default Chip;
