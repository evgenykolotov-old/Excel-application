import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from './store/rootReducer';
import { storage } from '@core/utils';
import { initialState } from './store/initialState';
import { debounce } from './core/utils';
import './scss/index.scss';

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  storage('excel-state', state);
});

store.subscribe(stateListener);

const excel = new Excel('#application', {
  components: [Header, Toolbar, Formula, Table],
  store
});
excel.render();
