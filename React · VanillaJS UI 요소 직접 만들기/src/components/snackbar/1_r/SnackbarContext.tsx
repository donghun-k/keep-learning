import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import SnackbarRoot from './SnackbarRoot';

export interface Snackbar {
  id: string;
  children: ReactNode;
  timeoutId: number | null;
}

type SnackbarState = Snackbar[];
type SnackbarActionType = 'upsert' | 'remove';

const SnackbarContext = createContext<SnackbarState>([]);
const SnackbarSetContext = createContext<
  Dispatch<{
    type: SnackbarActionType;
    payload: Record<string, any>;
  }>
>(() => {});

const snackbarReducerMap: Record<
  SnackbarActionType,
  (state: SnackbarState, payload: any) => SnackbarState
> = {
  upsert: (state, payload: Partial<Snackbar>) => {
    return state;
  },
  remove: (state, { id }: { id: string }) => {
    return state;
  },
};

const snackbarReducer = (
  state: SnackbarState,
  { type, payload }: { type: SnackbarActionType; payload: Record<string, any> }
) => snackbarReducerMap[type](state, payload);

const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(snackbarReducer, []);
  return (
    <SnackbarContext.Provider value={state}>
      <SnackbarSetContext.Provider value={dispatch}>
        {children}
        <SnackbarRoot />
      </SnackbarSetContext.Provider>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;

export const useSnackbar = () => useContext(SnackbarContext);
export const useSetSnackbar = () => {
  const dispatch = useContext(SnackbarSetContext);

  const createSnackbar = useCallback(() => {}, []);
  const removeSnackbar = useCallback(() => {}, []);

  return {
    createSnackbar,
    removeSnackbar,
  };
};
