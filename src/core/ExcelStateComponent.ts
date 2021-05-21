import ExcelComponent from './ExcelComponent';
import { State } from '../shared/State';

abstract class ExcelStateComponent extends ExcelComponent {
  protected state: State = this.store.getState();

  protected get template(): string {
    return JSON.stringify(this.state, null, 2);
  }

  protected initState(initialState: State): void {
    this.state = { ...initialState };
  }

  protected setState(newState: State): void {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}

export default ExcelStateComponent;
