import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {
  if (typeof window === "undefined") return null;

  const node = document.getElementById("portal") as Element;

  return ReactDOM.createPortal(children, node);
};

export default ModalPortal;
