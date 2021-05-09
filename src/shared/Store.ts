import { State } from './State';
import { ActionData } from '../store/actions';

export interface Store {
    subscribe: (...args: unknown[]) => unknown;
    dispatch: (action: ActionData) => void;
    getState: () => State;
}