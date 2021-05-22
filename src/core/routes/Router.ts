import { Routes } from '../../shared/Component';
import { $, Dom } from '../Dom';
import Page from '../Page';
import ActiveRoute from './ActiveRoute';

class Router {
  private $placeholder: Dom;
  private routes: Routes;
  private page: Page | null;

  constructor(selector: string, routes: Routes) {
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
    //eslint-disable-next-line
    const Page: any = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(<Dom>this.page?.getRoot());
    this.page?.afterRender();
  }
}

export default Router;
