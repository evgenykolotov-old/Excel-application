import { State } from '../shared/State';
import { RootReducer } from '../store/rootReducer';
import { Action } from '../store/actions';
import { Listener, Unsubscriiber } from '../shared/Component';

class StoreCreator {
  private state: State;
  private listeners: Listener[];

  constructor(private rootReducer: RootReducer, initialState: State) {
    this.state = { ...initialState };
    this.listeners = [];
  }

  public subscribe(fn: Listener): Unsubscriiber {
    this.listeners.push(fn);
    return () => {
        this.listeners = this.listeners.filter((listener: Listener) => listener !== fn);
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
