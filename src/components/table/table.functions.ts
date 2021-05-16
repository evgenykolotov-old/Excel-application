import { Dom } from '../../core/Dom';
import { range } from '../../core/utils';

export function shouldResize(event: any): any {
  return event.target.dataset.resize;
}

export function isCell(event: any): any {
  return event.target.dataset.type === 'cell';
}

export function matrix($target: Dom, $current: Dom): Array<string> {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key: string, { col, row }: { col: number, row: number}): string {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col -1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row -1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
