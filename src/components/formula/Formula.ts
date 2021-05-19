import ExcelComponent from '../../core/ExcelComponent';
import { $, Dom } from '../../core/Dom';
import { Component, ComponentOptions } from '../../shared/Component';
import { State } from '../../shared/State';

class Formula extends ExcelComponent implements Component {
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

  public storeChanged(data: State): void {
    const { currentText } = data;
    this.$formula && this.$formula.text(currentText);
  }

  private onInput(event: InputEvent): void {
    this.$emit('formula:input', $(<HTMLInputElement>event.target).text());
  }

  private onKeydown(event: KeyboardEvent): void {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}

export default Formula;
