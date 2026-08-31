import { V as head, Z as ensure_array_like } from './index2-D1ESINYy.js';
import { g as goto } from './client2-Delu94aQ.js';
import './auth-yELq7bSg.js';
import { D as Dialog, a as Dialog_content, c as Dialog_header, f as Dialog_footer, d as Dialog_title, e as Dialog_description, b as api } from './dialog-CU2liqWk.js';
import { B as Button } from './button-CTC_fQZG.js';
import { L as Label, I as Input } from './label-CBLPSDC4.js';
import './states.svelte-CK2yfPPg.js';
import { P as PageContainer, a as PageHeader, b as PageContent } from './PageContent-BJGk5Cqt.js';
import { S as Skeleton } from './skeleton-Bc2_3niB.js';
import { C as Card } from './card-5bk-9CzW.js';
import { a as toast } from './toast-state.svelte-DJTtrTAK.js';
import { e as escape_html } from './context-CU6onIa8.js';
import './exports-BOROuGf9.js';
import './index-rfN3dtkt.js';
import './state.svelte-CKPkeQuZ.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';
import './noop-BWgdq4c4.js';
import './index-server-_G0R5Qhl.js';
import './events-DJ_SkMbQ.js';
import './Icon-Da8UK3ET.js';

const settingsApi = {
  /**
   * Update user profile
   */
  async updateProfile(data) {
    return api.patch("/users/me", data);
  },
  /**
   * Delete user account (soft delete)
   */
  async deleteAccount(data) {
    return api.delete("/users/me", data);
  }
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showDeleteDialog = false;
    let deletePassword = "";
    let isDeleting = false;
    async function handleDeleteAccount() {
      if (!deletePassword.trim()) {
        toast.error("Please enter your password");
        return;
      }
      isDeleting = true;
      try {
        await settingsApi.deleteAccount({ password: deletePassword });
        toast.success("Account deactivated");
        goto("/login");
      } catch {
        toast.error("Failed. Please check your password.");
      } finally {
        isDeleting = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1jrfzug", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Settings — Taren</title>`);
        });
      });
      PageContainer($$renderer3, {
        children: ($$renderer4) => {
          PageHeader($$renderer4, { title: "Settings" });
          $$renderer4.push(`<!----> `);
          PageContent($$renderer4, {
            children: ($$renderer5) => {
              {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="mb-8">`);
                Skeleton($$renderer5, { class: "mb-2 h-8 w-48" });
                $$renderer5.push(`<!----> `);
                Skeleton($$renderer5, { class: "h-4 w-64" });
                $$renderer5.push(`<!----></div> <div class="max-w-2xl space-y-4"><!--[-->`);
                const each_array = ensure_array_like([1, 2, 3, 4]);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  each_array[$$index];
                  $$renderer5.push(`<!---->`);
                  Card($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<div class="border-b border-border px-5 py-3">`);
                      Skeleton($$renderer6, { class: "h-4 w-24" });
                      $$renderer6.push(`<!----></div> <div class="px-5 py-5">`);
                      Skeleton($$renderer6, { class: "h-10 w-full" });
                      $$renderer6.push(`<!----></div>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                }
                $$renderer5.push(`<!--]--></div>`);
              }
              $$renderer5.push(`<!--]-->`);
            }
          });
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----> <!---->`);
      Dialog($$renderer3, {
        get open() {
          return showDeleteDialog;
        },
        set open($$value) {
          showDeleteDialog = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "sm:max-w-[425px]",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Delete Account`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->This will permanently deactivate your account. You will not be able to log in again.`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="grid gap-4 py-4"><div class="grid gap-2">`);
              Label($$renderer5, {
                for: "delete-password",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Enter your password to confirm`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "delete-password",
                placeholder: "Password",
                type: "password",
                get value() {
                  return deletePassword;
                },
                set value($$value) {
                  deletePassword = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <!---->`);
              Dialog_footer($$renderer5, {
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    variant: "outline",
                    disabled: isDeleting,
                    onclick: () => {
                      showDeleteDialog = false;
                      deletePassword = "";
                    },
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Cancel`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "destructive",
                    disabled: isDeleting,
                    onclick: handleDeleteAccount,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(isDeleting ? "Deleting…" : "Delete Account")}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
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
//# sourceMappingURL=_page.svelte-DDSsvTce.js.map
