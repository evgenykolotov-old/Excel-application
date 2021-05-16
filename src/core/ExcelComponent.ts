import DomListener from './DomListener';
import Emitter from './Emitter';
import Store from './Store';
import { Dom } from './Dom';
import { ExcelComponentOptions } from '../shared/Component';
import { Action } from '../store/actions';
import { Styles } from '../shared/State';

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

  protected $emit(event: string, data?: Dom | Styles | string): void {
    this.emitter.emit(event, data);
  }

  protected $on(event: string, fn: (data?: Dom | Styles | string) => void): void {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  protected $dispatch(action: Action): void {
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
