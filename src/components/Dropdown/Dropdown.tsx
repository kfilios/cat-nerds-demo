import { Popover } from "@headlessui/react";
import { ReactNode } from "react";

import Button from "../Button/Button";

interface DropdownProps {
  trigger?: ReactNode;
  children: ReactNode | string;
}

const Dropdown = ({ trigger, children }: DropdownProps) => {
  return (
    <Popover className="relative">
      <Popover.Button>{trigger}</Popover.Button>
      <Popover.Panel className="absolute z-10 mt-2 flex w-80 translate-x-[-290px] transform justify-end">
        <div className="flex flex-col items-end gap-px overflow-hidden rounded-md bg-slate-700">
          {children}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode | string;
}

Dropdown.Button = ({ onClick, children }: ButtonProps) => {
  return (
    <Button className="rounded-none" onClick={onClick}>
      {children}
    </Button>
  );
};

export default Dropdown;
