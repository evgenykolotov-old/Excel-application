export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('')
      .map((_, index) => start + index);
}

export function storage(key, data?) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function debounce(fn: any, wait: number): any {
  let timeout: any;
  return function(...args: any[]): any {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

export function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event: any): void {
  event.preventDefault();
}
