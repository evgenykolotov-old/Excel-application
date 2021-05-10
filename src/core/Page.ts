abstract class Page {
  public params: any;

  constructor(params: any) {
    this.params = params;
  }

  public getRoot(): void {
    throw new Error('Method getRoot should be implemented');
  }

  public abstract afterRender(): void;

  public abstract destroy(): void;
}

export default Page;
