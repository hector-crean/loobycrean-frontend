import type { Action } from '.';

import { Observable } from "rxjs";

const resizable = <T extends HTMLElement>(elem: T) => {
  return new Observable<T>((subscriber) => {
    let ro = new ResizeObserver(() => {
      subscriber.next(elem);
    });

    ro.observe(elem);

    return () => {
      ro.disconnect();
    };
  });
};




const resize: Action = (node: HTMLElement) => {
    const ro = new ResizeObserver((entries, observer) => {
      node.dispatchEvent(new CustomEvent('resize', { detail: {entries, observer} }))
    });
  
    ro.observe(node);
  
    return {
      destroy() {
        ro.disconnect();
      }
    }
  }
  
  export { resize };
