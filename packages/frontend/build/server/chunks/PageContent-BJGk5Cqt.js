import { a0 as attr_class, Y as stringify, $ as clsx } from './index2-D1ESINYy.js';
import { e as escape_html } from './context-CU6onIa8.js';
import { a as twMerge } from './button-CTC_fQZG.js';

function PageContainer($$renderer, $$props) {
  let { children, class: className = "" } = $$props;
  $$renderer.push(`<div${attr_class(`flex h-full flex-col ${stringify(className)}`)}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></div>`);
}
function PageHeader($$renderer, $$props) {
  let { title, actions, children, class: className = "" } = $$props;
  $$renderer.push(`<div class="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-4 sm:px-6 md:px-8 md:py-5"><h1 class="text-lg font-semibold">${escape_html(title)}</h1> `);
  children?.($$renderer);
  $$renderer.push(`<!----> `);
  if (actions) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="flex items-center gap-2">`);
    actions($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function PageContent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, class: className = "" } = $$props;
    $$renderer2.push(`<div${attr_class(clsx(twMerge("flex-1 overflow-y-auto px-4 py-5 sm:px-6 md:px-8 md:py-6", className)))}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}

export { PageContainer as P, PageHeader as a, PageContent as b };
//# sourceMappingURL=PageContent-BJGk5Cqt.js.map
