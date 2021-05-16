import ExcelComponent from '../../core/ExcelComponent';
import { $, Dom } from '../../core/Dom';
import { ComponentOptions } from '../../shared/Component';
import { State } from '../../shared/State';

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

    this.$on('table:select', ($cell) => {
      if ($cell instanceof Dom) {
        this.$formula && this.$formula.text(<string>$cell.text());
      }
    })
  }

  public toHTML(): string {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  protected storeChanged({ currentText }: State): void {
    this.$formula && this.$formula.text(currentText);
  }

  protected onInput(event: Event): void {
    this.$emit('formula:input', $(<HTMLElement>event.target).text());
  }

  protected onKeydown(event: KeyboardEvent): void {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}

export default Formula;
