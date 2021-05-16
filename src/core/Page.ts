import { Dom } from "./Dom";

abstract class Page {
  protected param: string;

  constructor(param: string) {
    this.param = param;
  }

  /**
   * Абстракный метод, предназначен для создания готового компонента страницы;
   */
  public abstract getRoot(): Dom | string;

  /**
   * Абстракный метод, предназначен для выполнения действий, после рендера страницы;
   */
  public abstract afterRender(): void;

    /**
   * Абстракный метод, предназначен для выполнения действий, после удаления страницы;
   */
  public abstract destroy(): void;
}

export default Page;
