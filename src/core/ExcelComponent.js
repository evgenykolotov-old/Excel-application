import DomListener from '@core/DomListener';

class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}

export default ExcelComponent;
