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
      Object.keys(state).forEach(key => {
        if (!this.isEqual(this.prevState[key], state[key])) {
          components.forEach((component: Component) => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] };
              component.storeChanged(changes);
            }
          })
        }
      })
      this.prevState = this.store.getState();
    })
  }

  public unsubscribeFromStore(): void {
    this.sub && this.sub.unsubscribe();
  }

  private isEqual(a: unknown, b: unknown): boolean {
    if (typeof(a) === 'object' && typeof(b) === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }
}

export default StoreSubscriber;
