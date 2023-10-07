export type ConfigType<T> = {
    onStorageUpdate?: (state: T) => void;
    onSetStateFromStorage?: () => T;
    isSaveState?: boolean;
    key: string;
};
