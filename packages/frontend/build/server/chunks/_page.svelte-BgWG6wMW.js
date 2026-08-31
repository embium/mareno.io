import { V as head, Z as ensure_array_like } from './index2-D1ESINYy.js';
import './auth-yELq7bSg.js';
import { P as PageContainer, a as PageHeader, b as PageContent } from './PageContent-BJGk5Cqt.js';
import { S as Skeleton } from './skeleton-Bc2_3niB.js';
import { C as Card } from './card-5bk-9CzW.js';
import './alert-RUlDxuqF.js';
import './button-CTC_fQZG.js';
import './context-CU6onIa8.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1g22tpc", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Billing — Taren</title>`);
      });
    });
    PageContainer($$renderer2, {
      children: ($$renderer3) => {
        PageHeader($$renderer3, { title: "Billing" });
        $$renderer3.push(`<!----> `);
        PageContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="mx-auto max-w-2xl space-y-5">`);
            {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<!---->`);
              Card($$renderer4, {
                class: "p-5",
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="mb-4 flex items-center justify-between"><div class="flex items-center gap-3">`);
                  Skeleton($$renderer5, { class: "h-10 w-10 rounded-lg" });
                  $$renderer5.push(`<!----> <div>`);
                  Skeleton($$renderer5, { class: "mb-1 h-3 w-20" });
                  $$renderer5.push(`<!----> `);
                  Skeleton($$renderer5, { class: "h-6 w-24" });
                  $$renderer5.push(`<!----></div></div> `);
                  Skeleton($$renderer5, { class: "h-6 w-20 rounded-full" });
                  $$renderer5.push(`<!----></div> <div class="space-y-3"><!--[-->`);
                  const each_array = ensure_array_like([1, 2, 3]);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    each_array[$$index];
                    $$renderer5.push(`<div class="flex items-center justify-between"><div class="flex items-center gap-3">`);
                    Skeleton($$renderer5, { class: "h-4 w-4" });
                    $$renderer5.push(`<!----> `);
                    Skeleton($$renderer5, { class: "h-4 w-24" });
                    $$renderer5.push(`<!----></div> `);
                    Skeleton($$renderer5, { class: "h-4 w-32" });
                    $$renderer5.push(`<!----></div>`);
                  }
                  $$renderer5.push(`<!--]--></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            }
            $$renderer4.push(`<!--]--></div>`);
          }
        });
        $$renderer3.push(`<!---->`);
      }
    });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BgWG6wMW.js.map
