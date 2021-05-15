import Page from '../core/Page'
import {$, Dom} from '../core/Dom';
import { createRecordsTable } from './dashboard.functions'

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
        ${createRecordsTable()}
      </div>
    `)
  }

  public afterRender(): void {
    console.log('After Render DashboardPage');
  }

  public destroy(): void {
    console.log('Destroy DashboardPage');
  }
}

export default DashboardPage;
