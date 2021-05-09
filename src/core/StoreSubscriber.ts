import { Subscriber } from '../shared/StoreSubscriber';
import { Store } from '../shared/Store';
import { State } from '../shared/State';

class StoreSubscriber implements Subscriber {
  public store: Store;
  public sub: any;
  public prevState: State;

  constructor(store: Store) {
    this.store = store;
    this.sub = null;
    this.prevState = this.store.getState();
  }

  public subscribeComponents(components: unknown[]): void {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((state: State) => {
      Object.keys(state).forEach(key => {
        if (!this.isEqual(this.prevState[key], state[key])) {
          components.forEach((component: any) => {
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
    this.sub.unsubscribe();
  }

  private isEqual(a: unknown, b: unknown): boolean {
    if (typeof(a) === 'object' && typeof(b) === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }
}

export default StoreSubscriber;
