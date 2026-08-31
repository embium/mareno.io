import { _ as attributes, $ as clsx, a4 as bind_props } from './index2-D1ESINYy.js';
import { c as cn } from './button-CTC_fQZG.js';

function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      "data-slot": "card",
      class: clsx(cn("flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}

export { Card as C };
//# sourceMappingURL=card-5bk-9CzW.js.map
