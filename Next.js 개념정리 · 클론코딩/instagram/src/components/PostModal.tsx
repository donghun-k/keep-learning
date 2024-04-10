import { ReactNode } from "react";

import CloseIcon from "./ui/icons/CloseIcon";

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const PostModal = ({ onClose, children }: Props) => {
  return (
    <section
      className="bg fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="fixed right-0 top-0 p-8 text-white" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="h-3/5 w-4/5 max-w-7xl bg-white">{children}</div>
    </section>
  );
};

export default PostModal;
