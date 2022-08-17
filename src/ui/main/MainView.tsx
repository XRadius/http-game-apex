import * as React from 'react';
import * as ui from 'ui';

export const MainView = ui.createView(() => {
  React.useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.style.display = 'inline';
    return () => onUnmount(canvas);
  }, []);
  return null;
});

function onUnmount(canvas: HTMLElement) {
  canvas.style.display = 'none';
}
