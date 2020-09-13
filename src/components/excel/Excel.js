import { $ } from '@core/dom';

class Excel {
  constructor(selector, options) {
    this.$elem = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })
    return $root;
  }

  render() {
    this.$elem.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}

export default Excel;
