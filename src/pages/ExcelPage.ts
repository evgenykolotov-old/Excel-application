import Page from '@core/Page';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '../store/rootReducer';
import { storage } from '@core/utils';
import { normalizeInitialState } from '../store/initialState';
import { debounce } from '@core/utils';

function storageName(param) {
  return 'excel:' + param;
}

class ExcelPage extends Page {
  constructor(param) {
    super(param);
    this.storeSub = null;
  }

  getRoot() {
    const params = this.params ? this.params : Date.now().toString();

    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce(state => {
      storage(storageName(params), state);
    });

    this.storeSub = store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
    this.storeSub.unsubscribe();
  }
}

export default ExcelPage;
