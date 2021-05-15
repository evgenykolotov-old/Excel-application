import ExcelComponent from '../../core/ExcelComponent';
import { $, Dom } from '../../core/Dom';
import { ComponentOptions } from '../../shared/Component';

class Formula extends ExcelComponent {
  static className = 'excel__formula';
  private $formula: Dom | null = null;
  public $root: Dom;

  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
    this.$root = $root;
  }

  protected prepare(): void {
    console.log('Prepare Formula');
  }

  public init(): void {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell: any) => {
      this.$formula && this.$formula.text($cell.text());
    })
  }

  public toHTML(): string {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  protected storeChanged({ currentText }: any): void {
    this.$formula && this.$formula.text(currentText);
  }

  protected onInput(event: any): void {
    this.$emit('formula:input', $(event.target).text());
  }

  protected onKeydown(event: any): void {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}

export default Formula;
