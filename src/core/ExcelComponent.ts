import DomListener from './DomListener';
import { EventEmitter } from '../shared/Emitter';
import { Store } from '../shared/Store';
import { ActionData } from '../store/actions';

abstract class ExcelComponent extends DomListener {
  public name: string;
  public emitter: EventEmitter;
  public subscribe: unknown = [];
  public store: Store;
  public unsubscribers: unknown[] = [];

  constructor($root: unknown, options: any) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe;
    this.store = options.store;
    this.unsubscribers;

    this.prepare();
  }

  protected abstract prepare(): void;

  protected $emit(event: string, ...args: unknown[]): void {
    this.emitter.emit(event, ...args);
  }

  protected $on(event: string, fn: (...args: unknown[]) => unknown): void {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  protected $dispatch(action: ActionData): void {
    this.store.dispatch(action);
  }

  protected isWatching(key: unknown): unknown {
    return this.subscribe.includes(key);
  }

  protected abstract storeChanged(changes?: any): void;

  public toHTML(): string {
    return '';
  }

  public init(): void {
    this.initDOMListeners();
  }

  public destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}

export default ExcelComponent;
