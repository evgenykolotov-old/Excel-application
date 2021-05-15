import { $, Dom } from '../Dom';
import ActiveRoute from './ActiveRoute';

class Router {
  private $placeholder: Dom;
  private routes: any[];
  private page: any;

  constructor(selector: HTMLElement, routes: any[]) {
    if (!selector) {
      throw new Error('Selector is not provided in Router!');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  public init(): void {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  public destroy(): void {
    window.removeEventListener('hashchange', this.changePageHandler);
  }

  public changePageHandler(): void {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
}

export default Router;
