import { V as head } from './index2-D1ESINYy.js';
import { g as goto } from './client2-Delu94aQ.js';
import { B as Button } from './button-CTC_fQZG.js';
import { C as Card } from './card-5bk-9CzW.js';
import { C as Card_header, b as Card_title, c as Card_description, a as Card_content } from './card-title-CpAT6R_J.js';
import { L as Label, I as Input } from './label-CBLPSDC4.js';
import './auth-yELq7bSg.js';
import { E as Eye } from './eye-Bh7gGwn7.js';
import './context-CU6onIa8.js';
import './exports-BOROuGf9.js';
import './index-rfN3dtkt.js';
import './state.svelte-CKPkeQuZ.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';
import './Icon-Da8UK3ET.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let newPassword = "";
    let confirmPassword = "";
    let loading = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1xsw67i", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Reset Password — Taren</title>`);
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
                  $$renderer6.push(`<!---->Reset Password`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                class: "text-[#a3a3a3]",
                children: ($$renderer6) => {
                  {
                    $$renderer6.push("<!--[!-->");
                    $$renderer6.push(`Enter your new password`);
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
                  for: "new-password",
                  class: "text-[#fafafa]",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->New Password`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="relative">`);
                Input($$renderer5, {
                  id: "new-password",
                  type: "password",
                  placeholder: "Enter new password",
                  disabled: loading,
                  required: true,
                  class: "border-[#262626] bg-[#0a0a0a] pr-10 text-[#fafafa] placeholder:text-[#737373]",
                  get value() {
                    return newPassword;
                  },
                  set value($$value) {
                    newPassword = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <button type="button" class="absolute top-1/2 right-3 -translate-y-1/2 text-[#737373] hover:text-[#fafafa]" tabindex="-1">`);
                {
                  $$renderer5.push("<!--[!-->");
                  Eye($$renderer5, { class: "h-4 w-4" });
                }
                $$renderer5.push(`<!--]--></button></div> <p class="text-xs text-[#737373]">Must be at least 8 characters with uppercase, lowercase, number, and special character</p></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: "confirm-password",
                  class: "text-[#fafafa]",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Confirm Password`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="relative">`);
                Input($$renderer5, {
                  id: "confirm-password",
                  type: "password",
                  placeholder: "Confirm new password",
                  disabled: loading,
                  required: true,
                  class: "border-[#262626] bg-[#0a0a0a] pr-10 text-[#fafafa] placeholder:text-[#737373]",
                  get value() {
                    return confirmPassword;
                  },
                  set value($$value) {
                    confirmPassword = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <button type="button" class="absolute top-1/2 right-3 -translate-y-1/2 text-[#737373] hover:text-[#fafafa]" tabindex="-1">`);
                {
                  $$renderer5.push("<!--[!-->");
                  Eye($$renderer5, { class: "h-4 w-4" });
                }
                $$renderer5.push(`<!--]--></button></div></div> `);
                Button($$renderer5, {
                  type: "submit",
                  disabled: loading,
                  class: "w-full bg-blue-600 hover:bg-blue-700",
                  children: ($$renderer6) => {
                    {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push(`Reset Password`);
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
//# sourceMappingURL=_page.svelte-DoNW7sia.js.map
