import ExcelComponent from '../../core/ExcelComponent';
import ActiveRoute from '../../core/routes/ActiveRoute';
import { changeTitle } from '../../store/actions';
import { defaultTitle } from '../../constants';
import { $, Dom } from '../../core/Dom';
import { ComponentOptions } from '../../shared/Component';

class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: [],
      ...options
    });
  }

  protected prepare(): void {
    console.log('Prepare Header');
  }

  protected storeChanged(): void {
    console.log('StoreChanged Header');
  }

  public toHTML(): string {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }

  private onInput(event: Event): void {
    const $target = $(<HTMLElement>event.target);
    this.$dispatch(changeTitle(<string>$target.text()));
  }

  private onClick(event: Event): void {
    const $target = $(<HTMLElement>event.target);
    if ($target.data.button === 'remove') {
      const decision = window.confirm('Вы действительно хотите удалить эту таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}

export default Header;
