import { _ as attributes, $ as clsx, a4 as bind_props } from './index2-D1ESINYy.js';
import { c as cn } from './button-CTC_fQZG.js';

function Skeleton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      "data-slot": "skeleton",
      class: clsx(cn("animate-pulse rounded-md bg-muted", className)),
      ...restProps
    })}></div>`);
    bind_props($$props, { ref });
  });
}

export { Skeleton as S };
//# sourceMappingURL=skeleton-Bc2_3niB.js.map
