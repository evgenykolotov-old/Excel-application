import { $, Dom } from '../../core/Dom';
import Emitter from '../../core/Emitter';
import Store from '../../core/Store';
import StoreSubscriber from '../../core/StoreSubscriber';
import { preventDefault } from '../../core/utils';
import { ExcelOptions } from '../../shared/Component';
import { updateDate } from '../../store/actions';

class Excel {
  // eslint-disable-next-line
  private components: any[] = [];
  private store: Store;
  private emitter: Emitter;
  private subscriber: StoreSubscriber;

  constructor(options: ExcelOptions) {
    this.components = options.components;
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  public getRoot(): Dom {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })
    return $root;
  }

  public init(): void {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  public destroy(): void {
    document.removeEventListener('contextmenu', preventDefault);
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}

export default Excel;
