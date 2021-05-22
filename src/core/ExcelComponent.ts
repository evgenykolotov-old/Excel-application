import DomListener from './DomListener';
import Emitter from './Emitter';
import Store from './Store';
import { Dom } from './Dom';
import { ExcelComponentOptions, Unsubscriiber } from '../shared/Component';
import { Action } from '../store/actions';
import { State, Styles } from '../shared/State';

abstract class ExcelComponent extends DomListener {
  public name: string;
  public emitter: Emitter;
  public subscribe: Array<keyof State> = [];
  public store: Store;
  public unsubscribers: Unsubscriiber[] = [];

  constructor($root: Dom, options: ExcelComponentOptions) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe;
    this.store = options.store;
    this.unsubscribers;
  }

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

  public isWatching(key: keyof State): boolean {
    return this.subscribe.includes(key);
  }

  public abstract storeChanged(changes: State): void;

  public init(): void {
    this.initDOMListeners();
  }

  public destroy(): void {
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
