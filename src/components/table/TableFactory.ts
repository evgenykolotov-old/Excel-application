import { defaultStyles } from '../../store/initialState';
import { State, ColState, Styles, RowState } from '../../shared/State';

class TableFactory {
  private CODES = { A: 65, Z: 90 };
  private DEFAULT_WIDTH = 120;
  private DEFAULT_HEIGHT = 24;
  private rowsCount: number;
  private state: State;

  constructor(rowsCount = 50, state: State) {
    this.rowsCount = rowsCount;
    this.state = state;
  }

  public createTable(): string {
    const colsCount = this.CODES.Z - this.CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(this.toChar)
        .map(this.withWidthFrom(this.state.colState))
        .map(this.toColumn)
        .join('');
    rows.push(this.createRow(null, cols, {}));

    for (let row = 0; row < this.rowsCount; row++) {
      const cells = new Array(colsCount)
          .fill('')
          .map(this.toCell(this.state, row))
          .join('');
      rows.push(this.createRow(row + 1, cells, this.state.rowState));
    }

    return rows.join('');
  } 

  private toChar(_: string, index: number): string {
    return String.fromCharCode(this.CODES.A + index);
  }

  private withWidthFrom(state: ColState): (col: string, index: number) => { col: string; index: number; width: string } {
    const getWidth = this.getWidth.bind(this);
    return function(col: string, index: number): { col: string; index: number; width: string } {
      const width = getWidth(state, index);
      return { col, index, width };
    }
  }

  private getWidth(state: ColState, index: number): string {
    return (state[index] || this.DEFAULT_WIDTH) + 'px';
  }

  private toColumn({ col, index, width }: { col: string; index: number; width: string }): string {
    return `
      <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `;
  }


  private createRow(index: number | null, content: string, state: RowState): string {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    const height = this.getHeight(state, index);
    return `
      <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
        <div class="row-info">
          ${index ? index : ''}
          ${resize}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `;
  }

  private getHeight(state: RowState, index: number | null): string {
    return (index && state[index] || this.DEFAULT_HEIGHT) + 'px';
  }

  private toCell(state: State, row: number): (_: unknown, col: number) => string {
    const getWidth = this.getWidth.bind(this);
    const toInlineStyles = this.toInlineStyles.bind(this);

    return function(_: unknown, col: number): string {
      const width = getWidth(state.colState, col);
      const id = `${row}:${col}`;
      const data = state.dataState && state.dataState[id];
      const styles = toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id]
      });
      return `
        <div class="cell" 
          contenteditable 
          data-col="${col}" 
          data-type="cell"
          data-id="${id}"
          style="${styles}; width: ${width}"
        >${data || ''}</div>
      `;
    }
  }

  private toInlineStyles(styles: Styles = {}): string {
    return Object.keys(styles)
        .map(key => `${this.camelToDashCase(key)}: ${styles[<keyof Styles>key]}`)
        .join(';');
  }

  private camelToDashCase(str: string): string {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }
}

export default TableFactory;