import ExcelComponent from '@core/ExcelComponent';
import { createTable } from './table.template';

class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: []
    });
  }

  toHTML() {
    return createTable();
  }
}

export default Table;
