import * as mobxReact from 'mobx-react';

export function createView<T>(fn: (props: T) => any) {
  return mobxReact.observer((props: T) => fn(props) || null);
}
