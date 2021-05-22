import { $, Dom } from '../../core/Dom';
import { ResizeState } from '../../shared/State';

export function resizeHandler($root: Dom, event: Event): Promise<ResizeState> {
  return new Promise(resolve => {
    const $resizer = $(<HTMLElement>event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    $resizer.css((<unknown>{ opacity: 1, [sideProp]: '-5000px' }) as CSSStyleDeclaration);
    let value: number;
    document.onmousemove = event => {
      if (type === 'col') {
        const delta = event.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css((<unknown>{ right: -delta + 'px' }) as CSSStyleDeclaration);
      } else {
        const delta = event.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css((<unknown>{ bottom: -delta + 'px' }) as CSSStyleDeclaration);
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $parent.css((<unknown>{ width: value + 'px' }) as CSSStyleDeclaration);
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(elem => (<HTMLElement>elem).style.width = value + 'px');
      } else {
        $parent.css((<unknown>{ height: value + 'px' }) as CSSStyleDeclaration);
      }
      if (type !== undefined) {
        resolve((<unknown>{ id: $parent.data[type], type, value }) as ResizeState)
        $resizer.css((<unknown>{ opacity: 0, bottom: 0, right: 0 }) as CSSStyleDeclaration);
      }
    }
  });
}
