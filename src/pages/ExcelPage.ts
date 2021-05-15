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
import { debounce } from '../core/utils';
import { Dom } from '../core/Dom';
import { State } from '../shared/State';

class ExcelPage extends Page {
  private storeSub: any;
  private excel: Excel | null = null;

  constructor(param: string) {
    super(param);
    this.storeSub = null;
  }

  public getRoot(): Dom {
    const param = this.param ? this.param : Date.now().toString();

    const state = storage(this.storageName(param));
    const store = new Store(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state: State) => {
      storage(this.storageName(param), state);
    }, 600);

    this.storeSub = store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });
    return this.excel.getRoot();
  }

  public afterRender(): void {
    this.excel?.init();
  }

  public destroy(): void {
    this.excel?.destroy();
    this.storeSub.unsubscribe();
  }

  private storageName(param: string): string {
    return 'excel:' + param;
  }
}

export default ExcelPage;
