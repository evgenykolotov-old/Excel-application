import { Dom } from "../../core/Dom";

class TableSelection {
  static className = 'selected';
  private group: Dom[];
  public current: Dom | null;

  constructor() {
    this.group = [];
    this.current = null;
  }

  public clear(): void {
    this.group.forEach($cell => $cell.removeClass(TableSelection.className));
    this.group = [];
  }

  public select($elem: Dom): void {
    this.clear();
    $elem.focus().addClass(TableSelection.className);
    this.group.push($elem);
    this.current = $elem;
  }

  public selectGroup($group: Dom[] = []): void {
    this.clear();
    this.group = $group;
    this.group.forEach($elem => $elem.addClass(TableSelection.className));
  }

  public applyStyle(style: any): void {
    this.group.forEach($elem => $elem.css(style));
  }

  public get selectedIds(): any {
    return this.group.map($elem => $elem.id());
  }
}

export default TableSelection;
