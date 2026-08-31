import { V as head, X as attr, Y as stringify, a1 as attr_style } from './index2-D1ESINYy.js';
import './exports-BOROuGf9.js';
import './state.svelte-CKPkeQuZ.js';
import { B as Button } from './button-CTC_fQZG.js';
import { L as Label, I as Input } from './label-CBLPSDC4.js';
import './auth-yELq7bSg.js';
import { p as public_env } from './shared-server-BU2DVf8Q.js';
import { e as escape_html } from './context-CU6onIa8.js';
import 'zod';

function getPasswordStrength(password) {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
  return Math.min(strength, 4);
}
function getPasswordStrengthInfo(strength) {
  const info = [
    { label: "Very Weak", color: "red" },
    { label: "Weak", color: "orange" },
    { label: "Fair", color: "yellow" },
    { label: "Good", color: "lightgreen" },
    { label: "Strong", color: "green" }
  ];
  return info[strength] || info[0];
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let confirmPassword = "";
    let isSubmitting = false;
    public_env.PUBLIC_API_URL;
    const passwordStrength = getPasswordStrength(password);
    const strengthInfo = getPasswordStrengthInfo(passwordStrength);
    function handleEmailInput() {
    }
    function handlePasswordInput() {
    }
    function handleConfirmPasswordInput() {
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("ydeots", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Create Account — Taren</title>`);
        });
      });
      $$renderer3.push(`<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12"><div class="w-full max-w-md"><div class="rounded-lg border border-[#262626] bg-[#171717] p-8"><div class="mb-8 text-center"><h1 class="mb-2 text-3xl font-bold text-[#fafafa]">Join Taren</h1> <p class="text-[#737373]">Create your account to get started</p></div> <form class="space-y-5"><div class="space-y-2">`);
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
        placeholder: "Create a strong password",
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
      if (password) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-1"><div class="h-1 w-full overflow-hidden rounded bg-[#262626]"><div class="h-full transition-all"${attr_style(`width: ${stringify(passwordStrength / 4 * 100)}%; background-color: ${stringify(strengthInfo.color)}`)}></div></div> <p class="text-xs text-[#737373]">Strength: <span${attr_style(`color: ${stringify(strengthInfo.color)}`)}>${escape_html(strengthInfo.label)}</span></p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-xs text-[#525252]">Min 8 characters with uppercase, lowercase, number &amp; special character</p>`);
      }
      $$renderer3.push(`<!--]--></div> <div class="space-y-2">`);
      Label($$renderer3, {
        for: "confirmPassword",
        class: "font-medium text-[#fafafa]",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Confirm Password`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "confirmPassword",
        type: "password",
        placeholder: "Confirm your password",
        oninput: handleConfirmPasswordInput,
        disabled: isSubmitting,
        class: `border-[#262626] bg-[#0a0a0a] text-[#fafafa] focus:border-[#3b82f6] focus:ring-[#3b82f6] ${stringify("")}`,
        required: true,
        get value() {
          return confirmPassword;
        },
        set value($$value) {
          confirmPassword = $$value;
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
        disabled: isSubmitting,
        children: ($$renderer4) => {
          {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`Create Account`);
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></form> <div class="or-divider svelte-ydeots"><span>OR</span></div> <button id="google-signup-btn" type="button" class="google-btn svelte-ydeots"${attr("disabled", isSubmitting, true)}><svg class="google-icon svelte-ydeots" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg> Google</button> <div class="mt-6 text-center"><p class="text-[#737373]">Already have an account? <a href="/login" class="font-medium text-[#3b82f6] hover:text-[#2563eb]">Sign in</a></p></div></div></div></div>`);
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
//# sourceMappingURL=_page.svelte-CJqU26gL.js.map
