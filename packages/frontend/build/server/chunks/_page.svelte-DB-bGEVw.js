import { V as head, X as attr, Y as stringify } from './index2-D1ESINYy.js';
import './exports-BOROuGf9.js';
import './state.svelte-CKPkeQuZ.js';
import { B as Button } from './button-CTC_fQZG.js';
import { L as Label, I as Input } from './label-CBLPSDC4.js';
import './auth-yELq7bSg.js';
import { p as public_env } from './shared-server-BU2DVf8Q.js';
import './context-CU6onIa8.js';
import 'zod';

let user = null;
let loading = false;
let error = null;
const isAuthenticated = user !== null;
function getAuthState() {
  return {
    get user() {
      return user;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    get isAuthenticated() {
      return isAuthenticated;
    }
  };
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const authState = getAuthState();
    let email = "";
    let password = "";
    let isSubmitting = false;
    public_env.PUBLIC_API_URL;
    function handleEmailInput() {
    }
    function handlePasswordInput() {
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("8k30lk", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Sign In — Taren</title>`);
        });
      });
      $$renderer3.push(`<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12"><div class="w-full max-w-md"><div class="rounded-lg border border-[#262626] bg-[#171717] p-8"><div class="mb-8 text-center"><h1 class="mb-2 text-3xl font-bold text-[#fafafa]">Welcome Back</h1> <p class="text-[#737373]">Sign in to continue to Taren</p></div> <form class="space-y-6"><div class="space-y-2">`);
      Label($$renderer3, {
        for: "email",
        class: "font-medium text-[#fafafa]",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Email`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "email",
        type: "email",
        placeholder: "you@example.com",
        oninput: handleEmailInput,
        disabled: isSubmitting,
        class: `border-[#262626] bg-[#0a0a0a] text-[#fafafa] focus:border-[#3b82f6] focus:ring-[#3b82f6] ${stringify("")}`,
        required: true,
        get value() {
          return email;
        },
        set value($$value) {
          email = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="space-y-2">`);
      Label($$renderer3, {
        for: "password",
        class: "font-medium text-[#fafafa]",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Password`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        oninput: handlePasswordInput,
        disabled: isSubmitting,
        class: `border-[#262626] bg-[#0a0a0a] text-[#fafafa] focus:border-[#3b82f6] focus:ring-[#3b82f6] ${stringify("")}`,
        required: true,
        get value() {
          return password;
        },
        set value($$value) {
          password = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      Button($$renderer3, {
        type: "submit",
        class: "w-full bg-[#3b82f6] text-white hover:bg-[#2563eb]",
        disabled: authState.loading,
        children: ($$renderer4) => {
          {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`Sign In`);
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></form> <div class="or-divider svelte-8k30lk"><span>OR</span></div> <button id="google-login-btn" type="button" class="google-btn svelte-8k30lk"${attr("disabled", isSubmitting, true)}><svg class="google-icon svelte-8k30lk" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg> Google</button> <div class="mt-6 text-center"><p class="text-[#737373]">Don't have an account? <a href="/register" class="font-medium text-[#3b82f6] hover:text-[#2563eb]">Create an account</a></p></div></div></div></div>`);
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
//# sourceMappingURL=_page.svelte-DB-bGEVw.js.map
