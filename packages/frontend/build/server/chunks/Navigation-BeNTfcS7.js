import { g as goto } from './client2-Delu94aQ.js';
import { B as Button } from './button-CTC_fQZG.js';
import './auth-yELq7bSg.js';
import './states.svelte-CK2yfPPg.js';

function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function navigateTo(path) {
      goto();
    }
    $$renderer2.push(`<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"><div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"><a href="/" class="text-xl font-bold text-foreground transition-opacity hover:opacity-80">Taren</a> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<nav class="flex items-center gap-1"><a href="/pricing" class="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Pricing</a> `);
      Button($$renderer2, {
        variant: "ghost",
        size: "sm",
        class: "text-muted-foreground hover:text-foreground",
        onclick: () => navigateTo(),
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Sign in`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        size: "sm",
        class: "bg-foreground text-background hover:opacity-80",
        onclick: () => navigateTo(),
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Get started`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></nav>`);
    }
    $$renderer2.push(`<!--]--></div></header>`);
  });
}

export { Navigation as N };
//# sourceMappingURL=Navigation-BeNTfcS7.js.map
