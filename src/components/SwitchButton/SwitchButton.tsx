import Button from "components/Button/Button";
import { ReactNode } from "react";

interface Props {
  selected?: boolean;
  disabled?: boolean;
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode | string;
}

const SwitchButton = ({
  selected,
  disabled,
  color,
  className,
  onClick,
  children,
}: Props) => {
  const backgroundColor = selected ? `bg-${color}` : "bg-transparent";
  const borderColor = selected ? `!border-${color}` : "";
  const textColor = selected ? `text-${color}` : "text-slate-500";
  const hover = `hover:text-white`;

  return (
    <Button
      disabled={disabled}
      className={`${
        className ?? ""
      } ${borderColor} ${backgroundColor} ${textColor} ${hover}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SwitchButton;
