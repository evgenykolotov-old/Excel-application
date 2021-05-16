import ExcelStateComponent from '../../core/ExcelStateComponent';
import { defaultStyles } from '../../constants';
import { $, Dom } from '../../core/Dom';
import { ComponentOptions } from '../../shared/Component';
import { State, CurrentStyles, Styles } from '../../shared/State';

interface Button {
  icon: string;
  active: boolean;
  value: Styles
}

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

  protected storeChanged(changes: State): void {
    this.setState(<CurrentStyles>changes.currentStyles);
  }

  protected get template(): string {
    return this.createToolbar(this.state);
  }

  public toHTML(): string {
    return this.template;
  }

  private onClick(event: Event): void {
    const $target = $(<HTMLElement>event.target);
    if ($target.data.value && $target.data.type === 'button') {
      const value = <Styles>JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }

  private createToolbar(state: State): string {
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
