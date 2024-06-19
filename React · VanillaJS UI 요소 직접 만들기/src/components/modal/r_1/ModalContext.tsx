import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type ModalState = Map<string, ReactNode>;
type ModalDispatchState = Dispatch<SetStateAction<ModalState>>;

const ModalContext = createContext<ModalState>(new Map());
const ModalDispatchContext = createContext<ModalDispatchState>(() => {});

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalState>(new Map());

  return (
    <ModalContext.Provider value={modals}>
      <ModalDispatchContext.Provider value={setModals}>
        {children}
        <div id="modalRoot" />
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};
