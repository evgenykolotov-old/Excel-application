export interface EventEmitter {
    emit: (event: string, ...args: unknown[]) => boolean;
    subscribe: (event: string, fn: (...args: unknown[]) => unknown) =>  () => void;
}

export interface EventListener {
    [key: string]: Array<(...args: unknown[]) => unknown>;
}
