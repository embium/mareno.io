import './exports-BOROuGf9.js';
import './state.svelte-CKPkeQuZ.js';
import './button-CTC_fQZG.js';
import { C as Card } from './card-5bk-9CzW.js';
import { C as Card_header, b as Card_title, c as Card_description, a as Card_content } from './card-title-CpAT6R_J.js';
import './auth-yELq7bSg.js';
import './context-CU6onIa8.js';
import './index2-D1ESINYy.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">`);
    Card($$renderer2, {
      class: "w-full max-w-md border-[#262626] bg-[#171717]",
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "text-center",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-2xl text-[#fafafa]",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Email Verification`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              class: "text-[#a3a3a3]",
              children: ($$renderer5) => {
                {
                  $$renderer5.push("<!--[!-->");
                  {
                    $$renderer5.push("<!--[!-->");
                    {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push(`Processing verification`);
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]-->`);
                }
                $$renderer5.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          class: "space-y-6",
          children: ($$renderer4) => {
            {
              $$renderer4.push("<!--[!-->");
              {
                $$renderer4.push("<!--[!-->");
                {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]-->`);
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DkeO39Gk.js.map
