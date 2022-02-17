// @ts-ignore
import PanelSnap from 'panelsnap/lib/panelsnap.cjs.js';

const isClient = typeof window !== 'undefined';

export const Data = {
  instance: null,
}


type PanelSnapOption = {
  container?: any,
  panelSelector?: string,
  directionThreshold?: number,
  delay?: number,
  duration?: number,
  easing?: (t: any) => any,
}

export function init(option: PanelSnapOption) {
  if (Data.instance == null && isClient) {
    const container = document.body;
    const defaultOpt: PanelSnapOption = {
      container,
      panelSelector: 'section.snap-able',
      directionThreshold: 50,
      delay: 0,
      duration: 300,
      easing: function (t: any): any {
        return t
      },
    };
    const opt: PanelSnapOption = Object.assign({}, defaultOpt, option);

    // Skip if instance was already been initialized yet
    // if (opt.container?.dataset?.panelsnapId) {
    //   return;
    // }

    try {
      Data.instance = new PanelSnap(opt);
    } catch (e) {
      console.log('{PanelSnap.init} e: ', e);
    }
  }
}
