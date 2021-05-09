import { Store } from './Store';
import { State } from './State';

export interface Subscriber {
    store: Store;
    sub: unknown;
    prevState: State;
    subscribeComponents: (components: unknown[]) => void;
    unsubscribeFromStore: () => void;
}