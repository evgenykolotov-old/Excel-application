import ExcelStateComponent from '../../core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { defaultStyles } from '../../constants';
import { $, Dom } from '../../core/Dom';
import { ComponentOptions } from '../../shared/Component';

class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  protected prepare(): void {
    this.initState(defaultStyles);
  }

  protected storeChanged(changes: any): void {
    this.setState(changes.currentStyles);
  }

  protected get template(): string {
    return createToolbar(this.state);
  }

  public toHTML(): string {
    return this.template;
  }

  protected onClick(event: any): void {
    const $target = $(event.target);
    if ($target.data.value && $target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}

export default Toolbar;
