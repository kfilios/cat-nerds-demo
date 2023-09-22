import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface ModalProps {
  open?: boolean;
  children: ReactNode;
  onClose?: (value: boolean) => void;
  width?: string;
}

const Modal = ({ open = false, children, onClose, width }: ModalProps) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={onClose || (() => {})}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${
                    width ?? "max-w-md"
                  }`}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

interface TitleProps {
  children: ReactNode;
}

Modal.Title = ({ children }: TitleProps) => {
  return (
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      {children}
    </Dialog.Title>
  );
};

interface ContentProps {
  children: ReactNode;
}

Modal.Content = ({ children }: ContentProps) => {
  return (
    <div className="mt-2">
      <div className="text-sm text-gray-500">{children}</div>
    </div>
  );
};

interface ButtonAreaProps {
  children: ReactNode;
}

Modal.ButtonArea = ({ children }: ButtonAreaProps) => {
  return <div className="mt-4 flex gap-2">{children}</div>;
};

export default Modal;
