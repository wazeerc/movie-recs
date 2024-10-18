import React from "react";
import "./styles/IconButton.css";

type TState = "active" | "disabled";
type IIcon = "reset" | "clear";

interface IIconButtonProps {
  ref?: React.Ref<SVGSVGElement>;
  onReset: () => void;
  state?: TState;
  size?: number;
  color?: string;
  children?: React.ReactNode;
  icon: IIcon;
  className?: string;
}

const ResetSVG = (color: string, size: number, state: TState) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
        fill={state === "active" ? color : "#313244"}
      />
    </svg>
  );
};

const ClearSVG = (color: string, size: number) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 9L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9L9 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconButton = (props: IIconButtonProps) => {
  const { onreset: onReset, state = "active", size = 20, color = "#eee", icon } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state === "disabled") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onReset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (state === "disabled") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      onReset();
    }
  };

  return (
    <div
      role="button"
      aria-label={icon === "clear" ? "clear" : "reset"}
      className={`icon-container ${icon === "clear" ? "chip" : "reset-btn"} ${
        state === "disabled" ? "disabled" : ""
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={state === "disabled" ? -1 : 0}
    >
      {icon === "clear" ? ClearSVG(color, size) : ResetSVG(color, size, state)}
    </div>
  );
};

const MemoizedIconButton = React.memo(IconButton);
export default MemoizedIconButton;
