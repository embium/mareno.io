import { V as head, a0 as attr_class, $ as clsx, Z as ensure_array_like, X as attr, W as spread_props } from './index2-D1ESINYy.js';
import { N as Navigation } from './Navigation-BeNTfcS7.js';
import './auth-yELq7bSg.js';
import './exports-BOROuGf9.js';
import './state.svelte-CKPkeQuZ.js';
import { p as public_env } from './shared-server-BU2DVf8Q.js';
import { Z as Zap } from './zap-BS849Al4.js';
import { I as Icon } from './Icon-Da8UK3ET.js';
import { C as Circle_check } from './circle-check-zkZLQCVF.js';
import { e as escape_html } from './context-CU6onIa8.js';
import './client2-Delu94aQ.js';
import './index-rfN3dtkt.js';
import './button-CTC_fQZG.js';
import './states.svelte-CK2yfPPg.js';
import './index-server-_G0R5Qhl.js';
import 'zod';

function Clock($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 6v6l4 2" }]
  ];
  Icon($$renderer, spread_props([{ name: "clock" }, props, { iconNode }]));
}
function Star($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "star" }, props, { iconNode }]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let loadingProductId = null;
    const currentTier = null;
    const isOnProfessional = currentTier === "Professional";
    const STARTER_ID = public_env.PUBLIC_STRIPE_PRODUCT_ID_STARTER;
    const PRO_ID = public_env.PUBLIC_STRIPE_PRODUCT_ID_PROFESSIONAL;
    const starterFeatures = [
      {
        text: "14-day free trial — no charge until it ends",
        highlight: true
      },
      { text: "10 scans per day" },
      { text: "Up to 3 subreddits per scan" },
      { text: "Up to 15 posts scraped per subreddit" },
      { text: "Up to 10 evidences per finding" }
      // { text: 'AI-powered detection' },
      // { text: 'Up to 15 evidence quotes per pain point' },
      // { text: 'Export results as CSV' }
    ];
    const proFeatures = [
      { text: "Unlimited scans per day", highlight: true },
      { text: "Up to 10 subreddits per scan" },
      { text: "Up to 100 posts per subreddit" },
      { text: "Unlimited evidence per finding" }
      // { text: 'AI Startup Idea Reports' },
      // { text: 'CSV & PDF export' },
      // { text: 'Priority support' }
    ];
    head("1hrotn9", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Taren — Pricing</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Simple, transparent pricing. Start free for 14 days, no card required until your trial ends."/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background">`);
    Navigation($$renderer2);
    $$renderer2.push(`<!----> <section class="px-6 py-20 text-center lg:px-12 lg:py-28"><div class="mx-auto max-w-3xl"><p class="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">`);
    Zap($$renderer2, { class: "h-3.5 w-3.5" });
    $$renderer2.push(`<!----> Priced to beat the competition</p> <h1 class="mb-5 text-5xl font-bold tracking-tight lg:text-6xl">Simple, transparent pricing</h1> <p class="mx-auto max-w-2xl text-lg text-muted-foreground">No hidden fees. No surprise charges. Start with a 14-day free trial on Starter — no card
				charged until it ends.</p></div></section> <section class="px-6 pb-28 lg:px-12"><div class="mx-auto max-w-5xl"><div class="grid items-start gap-8 md:grid-cols-2"><div${attr_class(clsx([
      "relative flex flex-col rounded-2xl border p-8 transition-all",
      "border-border bg-card shadow-sm hover:border-border/80"
    ].join(" ")))}>`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="mb-5 flex items-center gap-2"><span class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">`);
    Clock($$renderer2, { class: "h-3 w-3" });
    $$renderer2.push(`<!----> 14-day free trial</span></div> <h3 class="mb-1 text-2xl font-bold">Starter</h3> <p class="mb-5 text-sm text-muted-foreground">Perfect for founders validating ideas</p> <div class="mb-6 flex items-baseline gap-1"><span class="text-5xl font-bold">$15</span> <span class="text-muted-foreground">/month</span> <span class="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Save $4 vs competitors</span></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <ul class="mb-8 flex-1 space-y-3"><!--[-->`);
    const each_array = ensure_array_like(starterFeatures);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      $$renderer2.push(`<li class="flex items-start gap-3">`);
      Circle_check($$renderer2, {
        class: [
          "mt-0.5 h-4 w-4 shrink-0",
          feature.highlight ? "text-amber-400" : "text-primary"
        ].join(" ")
      });
      $$renderer2.push(`<!----> <span${attr_class(clsx([
        "text-sm",
        feature.highlight ? "font-medium text-foreground" : "text-muted-foreground"
      ].join(" ")))}>${escape_html(feature.text)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button id="subscribe-starter-btn"${attr("disabled", isOnProfessional, true)} class="w-full rounded-xl bg-foreground px-6 py-3.5 text-center text-sm font-semibold text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">`);
      if (loadingProductId === STARTER_ID) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`Starting trial…`);
      } else {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`Start 14-day free trial`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class(clsx([
      "relative flex flex-col rounded-2xl border p-8 transition-all",
      "border-primary bg-card shadow-lg shadow-primary/10"
    ].join(" ")))}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="absolute -top-3.5 left-1/2 -translate-x-1/2"><span class="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">`);
      Star($$renderer2, { class: "h-3 w-3" });
      $$renderer2.push(`<!----> Most Popular</span></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="mb-5 h-[28px]"></div> <h3 class="mb-1 text-2xl font-bold">Professional</h3> <p class="mb-5 text-sm text-muted-foreground">For teams and agencies who need scale</p> <div class="mb-6 flex items-baseline gap-1"><span class="text-5xl font-bold">$39</span> <span class="text-muted-foreground">/month</span> <span class="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Save $10 vs competitors</span></div> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="mb-5 h-[24px]"></div>`);
    }
    $$renderer2.push(`<!--]--> <ul class="mb-8 flex-1 space-y-3"><!--[-->`);
    const each_array_1 = ensure_array_like(proFeatures);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let feature = each_array_1[$$index_1];
      $$renderer2.push(`<li class="flex items-start gap-3">`);
      Circle_check($$renderer2, {
        class: [
          "mt-0.5 h-4 w-4 shrink-0",
          feature.highlight ? "text-primary" : "text-primary/70"
        ].join(" ")
      });
      $$renderer2.push(`<!----> <span${attr_class(clsx([
        "text-sm",
        feature.highlight ? "font-medium text-foreground" : "text-muted-foreground"
      ].join(" ")))}>${escape_html(feature.text)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button id="subscribe-professional-btn"${attr("disabled", loadingProductId !== null, true)} class="w-full rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">${escape_html(loadingProductId === PRO_ID ? "Redirecting…" : "Subscribe to Professional")}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <p class="mt-10 text-center text-sm text-muted-foreground">All plans include a 30-day money-back guarantee. Questions? <a href="mailto:support@taren.io" class="text-primary underline underline-offset-2 hover:opacity-80">Contact support</a></p></div></section> <footer class="border-t border-border px-6 py-10 lg:px-12"><div class="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between"><p class="text-sm font-bold">Taren</p> <div class="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"><a href="/pricing" class="transition-colors hover:text-foreground">Pricing</a> <a href="/login" class="transition-colors hover:text-foreground">Sign in</a> <a href="/register" class="transition-colors hover:text-foreground">Get started</a> <a href="/privacy" class="transition-colors hover:text-foreground">Privacy Policy</a> <a href="/terms" class="transition-colors hover:text-foreground">Terms of Service</a></div> <p class="text-sm text-muted-foreground">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Taren. All rights reserved.</p></div></footer></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ByigwkLj.js.map
