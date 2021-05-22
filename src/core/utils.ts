//eslint-disable-next-line
export function storage(key: string, data?: any): any | void {
  if (!data) {
    //eslint-disable-next-line
    return JSON.parse(<any>localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

//eslint-disable-next-line
export function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event: Event): void {
  event.preventDefault();
}
