import Store from './Store';
import { State } from '../shared/State';
import { Unsubscriiber, Component } from '../shared/Component';

class StoreSubscriber {
  public store: Store;
  public sub: Unsubscriiber | null;
  public prevState: State;

  constructor(store: Store) {
    this.store = store;
    this.sub = null;
    this.prevState = this.store.getState();
  }

  public subscribeComponents(components: Component[]): void {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((state: State) => {
      (<Array<keyof State>>Object.keys(state)).forEach((key) => {
        if (!this.isEqual(<keyof State>this.prevState[key], <keyof State>state[key])) {
          components.forEach((component: Component) => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] } as unknown;
              component.storeChanged(<keyof State>changes);
            }
          })
        }
      })
      this.prevState = this.store.getState();
    })
  }

  public unsubscribeFromStore(): void {
    this.sub && this.sub();
  }

  private isEqual(a: keyof State, b: keyof State): boolean {
    if (typeof(a) === 'object' && typeof(b) === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }
}

export default StoreSubscriber;
