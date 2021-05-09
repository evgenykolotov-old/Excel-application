import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    $resizer.css({ opacity: 1, [sideProp]: '-5000px' });
    let value;
    document.onmousemove = event => {
      if (type === 'col') {
        const delta = event.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({ right: -delta + 'px' });
      } else {
        const delta = event.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({ bottom: -delta + 'px' });
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $parent.css({ width: value + 'px' });
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(elem => elem.style.width = value + 'px');
      } else {
        $parent.css({ height: value + 'px' });
      }
      resolve({
        id: $parent.data[type],
        type,
        value
      })
      $resizer.css({ opacity: 0, bottom: 0, right: 0 });
    }
  });
}
