import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    ReactNode,
    Dispatch
} from "react";
import {
    ConfigType 
} from "../types";

class NCoreContext<T extends {} | undefined, K extends ConfigType<T>> {
    // context:
    // @ts-ignore // TODO: Type problem will be fix.
    stateContext = createContext<T>({
    });

    // variables:
    state: T;
    setState: (state: Partial<T> | any) => void = () => {
    };
    subscribers: Array<{
      func: (params: any, state: T) => void;
      key: string;
  }> = [];
    config: K;

    // hooks:
    useContext = (): T => useContext(this.stateContext);

    constructor(state: T, config: K) {
        // set initial state:
        this.state = state;
        this.config = config;

        if(config.isSaveState && config.onSetStateFromStorage) {
            const savedState = config.onSetStateFromStorage();
            if(savedState) {
                this.state = {
                    ...state,
                    ...savedState
                };
            }
        }
    }

    // event emitters:
    emit = (params: any, state: T) => {
        this.subscribers.forEach(subscriber => {
            subscriber.func(params, state);
        });
    };

    emitWithKey = (key: string, payload?: any) => {
        this.subscribers.forEach(subscriber => {
            if(subscriber.key === key) subscriber.func(payload, this.state);
        });
    };

    // event listeners:
    addEventListener = (key: string, func: (state: T) => void) => {
        this.subscribers.push({
            func,
            key
        });
    };

    removeEventListener = (key: string) => {
        const funcIndex = this.subscribers.findIndex(subscriber => subscriber.key === key);
        if(funcIndex > -1) {
            this.subscribers.splice(funcIndex, 1);
        }
    };

    removeAllListeners = () => {
        this.subscribers = [];
    };

    // context provider:
    Provider = ({
        children
    }: {
        children: ReactNode;
    }) => {
        const StateContextRenderer = this.stateContext;

        const [state, setState]: [T, Dispatch<Partial<T>>] = useReducer((state: T, nextState: Partial<T>) => {
            const newState = {
                ...state,
                ...nextState
            };

            this.state = newState;

            this.emit(undefined, this.state);

            if(this.config.isSaveState && this.config.onStorageUpdate) {
                this.config.onStorageUpdate(this.state);
            }

            return newState;
        }, this.state);

        useEffect(() => {
            this.setState = setState;
        }, []);

        return <StateContextRenderer.Provider
            value={state}
        >
            {children}
        </StateContextRenderer.Provider>;
    };
};
export default NCoreContext;
