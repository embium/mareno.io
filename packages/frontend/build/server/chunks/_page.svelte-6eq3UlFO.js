import { V as head } from './index2-D1ESINYy.js';
import { g as goto } from './client2-Delu94aQ.js';
import { B as Button } from './button-CTC_fQZG.js';
import { C as Card } from './card-5bk-9CzW.js';
import { C as Card_header, b as Card_title, c as Card_description, a as Card_content } from './card-title-CpAT6R_J.js';
import { L as Label, I as Input } from './label-CBLPSDC4.js';
import './auth-yELq7bSg.js';
import './context-CU6onIa8.js';
import './exports-BOROuGf9.js';
import './index-rfN3dtkt.js';
import './state.svelte-CKPkeQuZ.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let loading = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1xufxwe", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Forgot Password — Taren</title>`);
        });
      });
      $$renderer3.push(`<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">`);
      Card($$renderer3, {
        class: "w-full max-w-md border-[#262626] bg-[#171717]",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "text-center",
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "text-2xl text-[#fafafa]",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Forgot Password`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                class: "text-[#a3a3a3]",
                children: ($$renderer6) => {
                  {
                    $$renderer6.push("<!--[!-->");
                    $$renderer6.push(`Enter your email to receive a password reset link`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<form class="space-y-4"><div class="space-y-2">`);
                Label($$renderer5, {
                  for: "email",
                  class: "text-[#fafafa]",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Email`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "email",
                  type: "email",
                  placeholder: "you@example.com",
                  disabled: loading,
                  required: true,
                  class: "border-[#262626] bg-[#0a0a0a] text-[#fafafa] placeholder:text-[#737373]",
                  get value() {
                    return email;
                  },
                  set value($$value) {
                    email = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> `);
                Button($$renderer5, {
                  type: "submit",
                  disabled: loading,
                  class: "w-full bg-blue-600 hover:bg-blue-700",
                  children: ($$renderer6) => {
                    {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push(`Send Reset Link`);
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="text-center">`);
                Button($$renderer5, {
                  onclick: () => goto(),
                  variant: "link",
                  class: "text-[#a3a3a3] hover:text-[#fafafa]",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Back to Login`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></form>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-6eq3UlFO.js.map
