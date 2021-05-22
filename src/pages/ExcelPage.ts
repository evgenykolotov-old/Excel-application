import Page from '../core/Page';
import Excel from '../components/excel/Excel';
import Header from '../components/header/Header';
import Toolbar from '../components/toolbar/Toolbar';
import Formula from '../components/formula/Formula';
import Table from '../components/table/Table';
import Store from '../core/Store';
import { rootReducer } from '../store/rootReducer';
import { storage } from '../core/utils';
import { normalizeInitialState } from '../store/initialState';
import { Dom } from '../core/Dom';
import { State } from '../shared/State';
import { Component, Unsubscriiber } from '../shared/Component';

class ExcelPage extends Page {
  private storeSub: Unsubscriiber | null;
  private excel: Excel | null = null;

  constructor(param: string) {
    super(param);
    this.storeSub = null;
  }

  public getRoot(): Dom {
    const param = this.param ? this.param : Date.now().toString();

    const state = storage(this.storageName(param));
    const store = new Store(rootReducer, normalizeInitialState(state));

    const stateListener = (state: State) => {
      storage(this.storageName(param), state);
    };

    this.storeSub = store.subscribe(stateListener);

    this.excel = new Excel({
      components: (<unknown>[Header, Toolbar, Formula, Table]) as Component[],
      store
    });
    return this.excel.getRoot();
  }

  public afterRender(): void {
    this.excel?.init();
  }

  public destroy(): void {
    this.excel?.destroy();
    this.storeSub && this.storeSub();
  }

  private storageName(param: string): string {
    return 'excel:' + param;
  }
}

export default ExcelPage;
