import { State } from '../shared/State';
import { RootReducer } from '../store/rootReducer';
import { Action } from '../store/actions';
import { Unsubscriiber } from '../shared/Component';

class StoreCreator {
  private state: State;
  private listeners: Array<(...args: Array<keyof State>) => void>;

  constructor(private rootReducer: RootReducer, initialState: State) {
    this.state = { ...initialState };
    this.listeners = [];
  }

  public subscribe(fn: any): Unsubscriiber {
    this.listeners.push(fn);
    return {
      unsubscribe() {
        this.listeners = this.listeners.filter((listener: unknown) => listener !== fn);
      }
    }
  }

  public dispatch(action: Action): void {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }

  public getState(): State {
    return JSON.parse(JSON.stringify(this.state));
  }
}

export default StoreCreator;
