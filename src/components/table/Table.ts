import ExcelComponent from '../../core/ExcelComponent';
import TableFactory from './TableFactory';
import { resizeHandler } from './table.resize';
import { isCell, matrix, shouldResize, nextSelector } from './table.functions';
import { defaultStyles } from '../../store/initialState';
import TableSelection from './TableSelection';
import * as actions from '../../store/actions';
import { $, Dom } from '../../core/Dom';
import { Component, ComponentOptions } from '../../shared/Component';

class Table extends ExcelComponent implements Component {
  static className = 'excel__table';
  public $root: Dom;
  private selection: TableSelection;

  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: [],
      ...options
    });
    this.$root= $root;
    this.selection = new TableSelection();
  }

  public storeChanged(): void {
    console.log('StoreChanged Table');
  }

  public init(): void {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => {
      if (typeof text === 'string') {
        this.selection.current?.text(text);
        this.updateTextInStore(text);
      }
    })

    this.$on('formula:done', () => {
      this.selection.current?.focus();
    })

    this.$on('toolbar:applyStyle', value => {
      if (typeof value !==  'string' && typeof value !== 'undefined' && !(value instanceof Dom)) {
        this.selection.applyStyle(value);
        this.$dispatch(actions.applyStyles({
          value,
          ids: this.selection.selectedIds,
        }));
      }
    })
  }

  public toHTML(): string {
    const table = new TableFactory(50, this.store.getState());
    return table.createTable();
  }

  private selectCell($cell: Dom): void {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(<never[]>Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  private async resizeTable(event: Event): Promise<void> {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn('Resize error', error.message);
    }
  }

  private onMousedown(event: MouseEvent): void {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(<HTMLElement>event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id: number) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  private onKeydown(event: KeyboardEvent): void {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current?.id(true);
      const $next = this.$root.find(nextSelector(event.key, id));
      this.selectCell($next);
    }
  }

  private updateTextInStore(value: string): void {
    if (this.selection.current) {
      this.$dispatch(actions.changeText({
        id: <string>this.selection.current.id(),
        value,
      }));
    }
  }

  private onInput(event: Event): void {
    this.updateTextInStore(<string>$(<HTMLElement>event.target).text());
  }
}

export default Table;
