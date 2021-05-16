import Page from '../core/Page';
import {$, Dom} from '../core/Dom';
import { storage } from '../core/utils';

export class DashboardPage extends Page {
  public getRoot(): Dom | string {
    const now = Date.now().toString()
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel. Панель Управления</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${this.createRecordsTable()}
      </div>
    `)
  }

  public afterRender(): void {
    console.log('After Render DashboardPage');
  }

  public destroy(): void {
    console.log('Destroy DashboardPage');
  }

  private toHTML(key: string): string {
    const model = storage(key);
    const id = key.split(':')[1];
    return `
      <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>
          ${new Date(model.openedDate).toLocaleDateString()}
          ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
      </li>
    `;
  }

  private getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.includes('excel')) {
        continue;
      }
      keys.push(key);
    }
    return keys
  }

  private createRecordsTable(): string {
    const keys = this.getAllKeys();
  
    if (!keys.length) {
      return `<p>Вы пока не создали ни одной таблицы</p>`;
    }
  
    return `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>
  
      <ul class="db__list">
        ${keys.map(this.toHTML).join('')}
      </ul>
    `;
  }
}

export default DashboardPage;
