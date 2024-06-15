import {
  Dispatch,
  EventHandler,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import SnackbarRoot from './SnackbarRoot';

const SNACKBAR_DURATION = 3000;
export interface Snackbar {
  id: string;
  children: ReactNode;
  isOpen: boolean;
  timeoutId: number | null;
  onMouseEnter?: EventHandler<any>;
  onMouseLeave?: EventHandler<any>;
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

const DefaultSnackbar: Snackbar = {
  id: '',
  children: null,
  isOpen: true,
  timeoutId: null,
};

const snackbarReducerMap: Record<
  SnackbarActionType,
  (state: SnackbarState, payload: any) => SnackbarState
> = {
  upsert: (state, payload: Partial<Snackbar>) => {
    const targetIndex = state.findIndex((item) => item.id === payload.id);
    if (targetIndex > -1) {
      const newSnackbars = state.map((item, i) => {
        if (i === targetIndex) {
          return {
            ...state[targetIndex],
            ...payload,
          };
        }
        return item;
      });
      return newSnackbars;
    }
    return [...state, { ...DefaultSnackbar, ...payload }];
  },
  remove: (state, { id }: { id: string }) => {
    return state.filter((item) => item.id !== id);
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

  const createSnackbar = useCallback((id: string, children: ReactNode) => {
    const newItem: Snackbar = {
      id,
      children,
      isOpen: true,
      timeoutId: window.setTimeout(() => {
        dispatch({
          type: 'upsert',
          payload: { id, isOpen: false, timeoutId: null },
        });
      }, SNACKBAR_DURATION),
      onMouseEnter: () => {
        if (newItem.timeoutId) {
          window.clearTimeout(newItem.timeoutId);
        }
      },
      onMouseLeave: () => {
        newItem.timeoutId = window.setTimeout(() => {
          dispatch({
            type: 'upsert',
            payload: { id, isOpen: false, timeoutId: null },
          });
        }, SNACKBAR_DURATION);
      },
    };
    dispatch({ type: 'upsert', payload: newItem });
  }, []);
  const removeSnackbar = useCallback((id: string) => {
    dispatch({ type: 'remove', payload: { id } });
  }, []);

  return {
    createSnackbar,
    removeSnackbar,
  };
};
