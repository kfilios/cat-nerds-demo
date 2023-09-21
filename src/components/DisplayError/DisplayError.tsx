import { ReactNode } from "react";
import error from "images/error.svg";

interface Props {
  title?: string;
  children: ReactNode | string;
}

const DisplayError = ({ title, children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800 p-20 text-center text-white">
      <img width={200} src={error} alt="error" />
      {title && <h1 className="text-5xl">{title}</h1>}
      {children}
    </div>
  );
};

export default DisplayError;
