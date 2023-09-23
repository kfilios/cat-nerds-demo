import { ReactNode } from "react";

interface Props {
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode | string;
}

const Button = ({ disabled, className, onClick, children }: Props) => {
  const hoverStyle = "hover:!border-blue-500 hover:bg-blue-500";

  return (
    <div onClick={onClick} className="w-fit">
      <button
        disabled={disabled}
        className={`flex gap-2 border-2 border-slate-500 bg-slate-500 px-4 py-2 text-sm text-white transition duration-200 ${hoverStyle} rounded-md ${
          className ?? ""
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
