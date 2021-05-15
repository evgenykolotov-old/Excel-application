import { Dom } from "./Dom";

abstract class Page {
  protected param: string;

  constructor(param: string) {
    this.param = param;
  }

  public abstract getRoot(): Dom | string;

  public abstract afterRender(): void;

  public abstract destroy(): void;
}

export default Page;
