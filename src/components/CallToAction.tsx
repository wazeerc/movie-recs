type TCallToActionWithResetProps = {
  PrimaryAction?: React.ReactNode | null;
  AlternatePrimaryAction?: React.ReactNode | null;
  SecondaryAction?: React.ReactNode | null;
};

/**
 * A functional component that renders a call-to-action section with either PrimaryAction or a AlternatePrimaryAction, and a SecondaryAction element.
 *
 * @component
 * @param {TActionWithSecondaryActionProps} props - The properties for the component.
 * @param {React.ReactNode} props.PrimaryAction - An optional PrimaryAction element to be displayed.
 * @param {React.ReactNode} props.AlternatePrimaryAction - An optional AlternatePrimaryAction element to be displayed.
 * @param {React.ReactNode} props.SecondaryAction - A SecondaryAction element to be displayed.
 * @returns {JSX.Element} The rendered call-to-action section.
 */
const CallToActionWithReset: React.FC<TCallToActionWithResetProps> = ({
  PrimaryAction,
  AlternatePrimaryAction,
  SecondaryAction,
}) => {
  if (PrimaryAction && AlternatePrimaryAction)
    throw new Error("Only one PrimaryAction can be used at a time.");

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-4">
      <div className="flex-grow">{PrimaryAction ?? AlternatePrimaryAction}</div>
      {SecondaryAction && <div className="flex-shrink-0">{SecondaryAction}</div>}
    </div>
  );
};

export default CallToActionWithReset;
