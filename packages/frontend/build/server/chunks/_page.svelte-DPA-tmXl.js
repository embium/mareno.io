import { V as head } from './index2-D1ESINYy.js';
import './exports-BOROuGf9.js';
import { e as escape_html } from './context-CU6onIa8.js';
import './state.svelte-CKPkeQuZ.js';
import './auth-yELq7bSg.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let statusMessage = "Completing sign-in...";
    head("1dpkce6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Signing in… — Taren</title>`);
      });
    });
    $$renderer2.push(`<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a]"><div class="space-y-4 text-center">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="spinner svelte-1dpkce6"></div>`);
    }
    $$renderer2.push(`<!--]--> <p class="text-sm text-[#737373]">${escape_html(statusMessage)}</p></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DPA-tmXl.js.map
