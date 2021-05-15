import DomListener from './DomListener';
import Emitter from './Emitter';
import Store from './Store';
import { ActionData } from '../store/actions';
import { Dom } from './Dom';
import { ExcelComponentOptions } from '../shared/Component';

abstract class ExcelComponent extends DomListener {
  public name: string;
  public emitter: Emitter;
  public subscribe: any[] = [];
  public store: Store;
  public unsubscribers: any[] = [];

  constructor($root: Dom, options: ExcelComponentOptions) {
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

  protected init(): void {
    this.initDOMListeners();
  }

  protected destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }

  /**
   * Абстрактный метод для описания шаблона компонента;
   * @returns string;
   */
  public abstract toHTML(): string;
}

export default ExcelComponent;
