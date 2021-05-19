import ExcelStateComponent from '../../core/ExcelStateComponent';
import { $, Dom } from '../../core/Dom';
import { Component, ComponentOptions } from '../../shared/Component';
import { State, Styles } from '../../shared/State';

interface Button {
  icon: string;
  active: boolean;
  value: Styles
}

class Toolbar extends ExcelStateComponent implements Component {
  static className = 'excel__toolbar';

  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  public storeChanged(changes: State): void {
      this.setState(changes);
  }

  public toHTML(): string {
    return this.template;
  }

  protected get template(): string {
    if (this.state.currentStyles) {
      return this.createToolbar(this.state.currentStyles);
    }
    return this.createToolbar({});
  }

  private onClick(event: Event): void {
    const $target = $(<HTMLElement>event.target);
    if ($target.data.value && $target.data.type === 'button') {
      const value = <Styles>JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }

  private createToolbar(state: Styles): string {
    const buttons: Button[] = [
      {
        icon: 'format_align_left',
        active: state['textAlign'] === 'left',
        value: { textAlign: 'left' },
      },
      {
        icon: 'format_align_center',
        active: state['textAlign'] === 'center',
        value: { textAlign: 'center' },
      },
      {
        icon: 'format_align_right',
        active: state['textAlign'] === 'right',
        value: { textAlign: 'right' },
      },
      {
        icon: 'format_bold',
        active: state['fontWeight'] === 'bold',
        value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
      },
      {
        icon: 'format_italic',
        active: state['fontStyle'] === 'italic',
        value: { fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic' },
      },
      {
        icon: 'format_underlined',
        active: state['textDecoration'] === 'underline',
        value: { textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline' },
      }
    ];
    return buttons.map(this.toButton).join('');
  }

  private toButton(button: Button): string {
    const meta = `data-type="button" data-value='${JSON.stringify(button.value)}'`;
    return `
      <div 
        class="button ${button.active ? 'active' : ''}"
        ${meta}
      >
        <i class="material-icons" ${meta}>${button.icon}</i>
      </div>
    `;
  }
}

export default Toolbar;
