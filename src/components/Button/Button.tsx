import { ReactNode } from "react";

interface Props {
  noRound?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode | string;
}

const Button = ({ noRound, onClick, children }: Props) => {
  return (
    <div onClick={onClick} className="w-auto">
      <button
        className={`bg-slate-500 px-4 py-2 text-sm text-white transition duration-200 hover:bg-blue-500 ${
          noRound ? "" : "rounded-md"
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
