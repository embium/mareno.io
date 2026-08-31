import { a2 as store_get, a3 as unsubscribe_stores } from './index2-D1ESINYy.js';
import './exports-BOROuGf9.js';
import './state.svelte-CKPkeQuZ.js';
import './auth-yELq7bSg.js';
import './client-1qnLn_6X.js';
import { g as getContext } from './context-CU6onIa8.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';
import './client2-Delu94aQ.js';
import './index-rfN3dtkt.js';

const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/dashboard/discover") || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/dashboard/history") || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/dashboard/results") || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/dashboard/scan");
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex h-screen items-center justify-center bg-background"><div class="text-muted-foreground">Loading…</div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-Tm_M_pSH.js.map
