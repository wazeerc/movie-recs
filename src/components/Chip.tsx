interface ChipProps {
  label: string;
  onDelete?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div>
      <span>{label}</span>
      {onDelete && <button onClick={onDelete}>&times;</button>}
    </div>
  );
};

export default Chip;
