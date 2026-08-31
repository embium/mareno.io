import { V as head, W as spread_props, Y as stringify, a0 as attr_class, Z as ensure_array_like, X as attr, _ as attributes, $ as clsx, a4 as bind_props } from './index2-D1ESINYy.js';
import { D as Dialog, a as Dialog_content, b as api, X, c as Dialog_header, d as Dialog_title, e as Dialog_description, f as Dialog_footer } from './dialog-CU2liqWk.js';
import { B as Button, c as cn } from './button-CTC_fQZG.js';
import { I as Input, L as Label } from './label-CBLPSDC4.js';
import { B as Badge } from './badge-Dutbp7wb.js';
import { S as Skeleton } from './skeleton-Bc2_3niB.js';
import { C as Card } from './card-5bk-9CzW.js';
import { C as Card_header, a as Card_content, b as Card_title, c as Card_description } from './card-title-CpAT6R_J.js';
import { A as Alert } from './alert-RUlDxuqF.js';
import { K as Key_round, S as Shield, L as Lock, R as Refresh_cw, T as Table, a as Table_header, b as Table_body, c as Tabs, d as Tabs_list, C as Copy, e as Tabs_content, f as Check, g as Sparkles, h as Table_row, i as Table_head, j as Table_cell, k as Tabs_trigger } from './tabs-list-DHA4xqYV.js';
import { P as PageContainer, a as PageHeader, b as PageContent } from './PageContent-BJGk5Cqt.js';
import { S as Search } from './search-BKMxGa8a.js';
import { I as Icon } from './Icon-Da8UK3ET.js';
import { T as Triangle_alert } from './triangle-alert-BHZthjHx.js';
import { a as toast } from './toast-state.svelte-DJTtrTAK.js';
import { E as Eye } from './eye-Bh7gGwn7.js';
import { C as Circle_check } from './circle-check-zkZLQCVF.js';
import { e as escape_html } from './context-CU6onIa8.js';
import './auth-yELq7bSg.js';
import './shared-server-BU2DVf8Q.js';
import 'zod';
import './noop-BWgdq4c4.js';
import './index-server-_G0R5Qhl.js';
import './events-DJ_SkMbQ.js';

function Code_xml($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "m18 16 4-4-4-4" }],
    ["path", { "d": "m6 8-4 4 4 4" }],
    ["path", { "d": "m14.5 4-5 16" }]
  ];
  Icon($$renderer, spread_props([{ name: "code-xml" }, props, { iconNode }]));
}
function Eye_off($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
      }
    ],
    ["path", { "d": "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
    [
      "path",
      {
        "d": "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
      }
    ],
    ["path", { "d": "m2 2 20 20" }]
  ];
  Icon($$renderer, spread_props([{ name: "eye-off" }, props, { iconNode }]));
}
function Plus($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  Icon($$renderer, spread_props([{ name: "plus" }, props, { iconNode }]));
}
function Shield_check($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  Icon($$renderer, spread_props([{ name: "shield-check" }, props, { iconNode }]));
}
function Terminal($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M12 19h8" }],
    ["path", { "d": "m4 17 6-6-6-6" }]
  ];
  Icon($$renderer, spread_props([{ name: "terminal" }, props, { iconNode }]));
}
function Trash_2($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M10 11v6" }],
    ["path", { "d": "M14 11v6" }],
    ["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
  ];
  Icon($$renderer, spread_props([{ name: "trash-2" }, props, { iconNode }]));
}
const apiKeysApi = {
  /**
   * Generate a new API key
   */
  generateKey: async (name) => {
    return api.post("/api/api-keys", { name });
  },
  /**
   * List all API keys for the current user
   */
  listKeys: async () => {
    return api.get("/api/api-keys");
  },
  /**
   * Delete/revoke an API key
   */
  deleteKey: async (keyId) => {
    return api.delete(`/api/api-keys/${keyId}`);
  }
};
function Alert_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      "data-slot": "alert-description",
      class: clsx(cn("text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Alert_title($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      "data-slot": "alert-title",
      class: clsx(cn("font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let apiKeys = [];
    let isLoadingKeys = true;
    let isRefreshing = false;
    let searchQuery = "";
    let statusFilter = "all";
    let showGenerateDialog = false;
    let newKeyName = "";
    let keyNameError = "";
    let isGeneratingKey = false;
    let generatedKey = null;
    let isKeyVisible = false;
    let isGeneratedCopied = false;
    let keyToRevoke = null;
    let isRevoking = false;
    let copiedKeyId = null;
    let copiedSnippetLang = null;
    let activeCodeTab = "curl";
    const activeKeysCount = apiKeys.filter((k) => k.is_active).length;
    const revokedKeysCount = apiKeys.filter((k) => !k.is_active).length;
    const filteredKeys = apiKeys.filter((key) => {
      const matchesQuery = searchQuery.trim() === "" || key.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || key.masked_key.toLowerCase().includes(searchQuery.toLowerCase().trim());
      if (!matchesQuery) return false;
      if (statusFilter === "active") return key.is_active;
      if (statusFilter === "revoked") return !key.is_active;
      return true;
    });
    async function loadKeys(silent = false) {
      if (silent) {
        isRefreshing = true;
      } else {
        isLoadingKeys = true;
      }
      try {
        const response = await apiKeysApi.listKeys();
        apiKeys = response.api_keys;
      } catch (error) {
        console.error("Failed to load API keys:", error);
        toast.error("Failed to load API keys");
      } finally {
        isLoadingKeys = false;
        isRefreshing = false;
      }
    }
    function openGenerateDialog() {
      newKeyName = "";
      keyNameError = "";
      generatedKey = null;
      isKeyVisible = false;
      isGeneratedCopied = false;
      showGenerateDialog = true;
    }
    async function copyToClipboard(text, identifier, isGenerated = false) {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        if (isGenerated) {
          isGeneratedCopied = true;
          setTimeout(
            () => {
              isGeneratedCopied = false;
            },
            2500
          );
        } else {
          copiedKeyId = identifier;
          setTimeout(
            () => {
              if (copiedKeyId === identifier) copiedKeyId = null;
            },
            2e3
          );
        }
        toast.success("Copied to clipboard");
      } catch {
        toast.error("Failed to copy to clipboard");
      }
    }
    async function copySnippet(code, lang) {
      try {
        await navigator.clipboard.writeText(code);
        copiedSnippetLang = lang;
        toast.success("Code snippet copied");
        setTimeout(
          () => {
            if (copiedSnippetLang === lang) copiedSnippetLang = null;
          },
          2e3
        );
      } catch {
        toast.error("Failed to copy code snippet");
      }
    }
    function closeGenerateDialog() {
      if (generatedKey && !isGeneratedCopied) {
        toast.info("Make sure you have saved your API key securely.");
      }
      showGenerateDialog = false;
      generatedKey = null;
      newKeyName = "";
      keyNameError = "";
      isKeyVisible = false;
      isGeneratedCopied = false;
    }
    function handleRevokeClick(key) {
      keyToRevoke = key;
    }
    async function executeRevokeKey() {
      if (!keyToRevoke) return;
      isRevoking = true;
      const targetId = keyToRevoke.id;
      try {
        await apiKeysApi.deleteKey(targetId);
        apiKeys = apiKeys.filter((k) => k.id !== targetId);
        toast.success(`API key "${keyToRevoke.name}" has been revoked`);
        keyToRevoke = null;
      } catch (error) {
        console.error("Failed to revoke API key:", error);
        toast.error("Failed to revoke API key");
      } finally {
        isRevoking = false;
      }
    }
    function formatDate(dateString) {
      if (!dateString) return "Never";
      return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function formatShortDate(dateString) {
      if (!dateString) return "Never";
      return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    const sampleCurl = `curl -X POST https://mareno.io/api/search/web \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d "{\\"query\\": \\"python\\"}"`;
    const sampleJs = `const response = await fetch("https://mareno.io/api/search/web", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.TAREN_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "distributed systems architecture"
  })
});

const data = await response.json();
console.log(data);`;
    const samplePython = `import os
import requests

api_key = os.getenv("TAREN_API_KEY")
url = "https://mareno.io/api/search/web"

headers = {
    "X-API-Key": api_key,
    "Content-Type": "application/json"
}

payload = {
    "query": "distributed systems architecture"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("c1vybi", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>API Keys — Taren</title>`);
        });
      });
      PageContainer($$renderer3, {
        children: ($$renderer4) => {
          {
            let actions = function($$renderer5) {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Button($$renderer5, {
                variant: "outline",
                size: "sm",
                onclick: () => loadKeys(true),
                disabled: isLoadingKeys || isRefreshing,
                title: "Refresh API Keys",
                class: "gap-1.5",
                children: ($$renderer6) => {
                  Refresh_cw($$renderer6, {
                    class: `h-3.5 w-3.5 ${stringify(isRefreshing ? "animate-spin" : "")}`
                  });
                  $$renderer6.push(`<!----> <span class="hidden sm:inline">Refresh</span>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                onclick: openGenerateDialog,
                size: "sm",
                class: "gap-1.5",
                children: ($$renderer6) => {
                  Plus($$renderer6, { class: "h-4 w-4" });
                  $$renderer6.push(`<!----> <span>Create API Key</span>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            };
            PageHeader($$renderer4, { title: "API Keys", actions });
          }
          $$renderer4.push(`<!----> `);
          PageContent($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-6"><div class="grid grid-cols-1 gap-4 sm:grid-cols-3"><!---->`);
              Card($$renderer5, {
                class: "p-5",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="mb-3 flex items-center justify-between"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">`);
                  Key_round($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----></div> `);
                  Badge($$renderer6, {
                    variant: "outline",
                    class: "border-emerald-600/30 bg-emerald-500/10 font-medium text-emerald-600 dark:text-emerald-400",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div> <p class="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">Active Keys</p> `);
                  if (isLoadingKeys) {
                    $$renderer6.push("<!--[-->");
                    Skeleton($$renderer6, { class: "h-8 w-16" });
                  } else {
                    $$renderer6.push("<!--[!-->");
                    $$renderer6.push(`<p class="text-2xl font-bold tracking-tight">${escape_html(activeKeysCount)}</p>`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Card($$renderer5, {
                class: "p-5",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="mb-3 flex items-center justify-between"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
                  Shield($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----></div> <span class="text-xs font-medium text-muted-foreground">All Time</span></div> <p class="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">Total Generated</p> `);
                  if (isLoadingKeys) {
                    $$renderer6.push("<!--[-->");
                    Skeleton($$renderer6, { class: "h-8 w-16" });
                  } else {
                    $$renderer6.push("<!--[!-->");
                    $$renderer6.push(`<p class="text-2xl font-bold tracking-tight">${escape_html(apiKeys.length)}</p>`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Card($$renderer5, {
                class: "p-5",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="mb-3 flex items-center justify-between"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">`);
                  Lock($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----></div> `);
                  Badge($$renderer6, {
                    variant: "secondary",
                    class: "text-xs",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Argon2id`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div> <p class="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">Authentication</p> <p class="truncate text-sm font-semibold">X-API-Key / Bearer</p>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> <!---->`);
              Card($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Card_header($$renderer6, {
                    class: "p-4",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><!---->`);
                      Card_title($$renderer7, {
                        class: "text-base font-semibold",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Your Secret Keys`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <!---->`);
                      Card_description($$renderer7, {
                        class: "mt-0.5 text-xs",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Secret API keys used to authenticate programmatic requests to the API.`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----></div> <div class="flex flex-wrap items-center gap-2"><div class="relative w-full sm:w-60">`);
                      Search($$renderer7, {
                        class: "absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        placeholder: "Filter keys...",
                        class: "h-8 pr-7 pl-8 text-xs",
                        get value() {
                          return searchQuery;
                        },
                        set value($$value) {
                          searchQuery = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----> `);
                      if (searchQuery) {
                        $$renderer7.push("<!--[-->");
                        $$renderer7.push(`<button class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">`);
                        X($$renderer7, { class: "h-3.5 w-3.5" });
                        $$renderer7.push(`<!----></button>`);
                      } else {
                        $$renderer7.push("<!--[!-->");
                      }
                      $$renderer7.push(`<!--]--></div> <div class="flex items-center rounded-lg border border-border bg-muted/40 p-0.5 text-xs"><button${attr_class(`rounded-md px-2.5 py-1 font-medium transition-colors ${stringify(statusFilter === "all" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}`)}>All (${escape_html(apiKeys.length)})</button> <button${attr_class(`rounded-md px-2.5 py-1 font-medium transition-colors ${stringify(statusFilter === "active" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}`)}>Active (${escape_html(activeKeysCount)})</button> <button${attr_class(`rounded-md px-2.5 py-1 font-medium transition-colors ${stringify(statusFilter === "revoked" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}`)}>Revoked (${escape_html(revokedKeysCount)})</button></div></div></div>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Card_content($$renderer6, {
                    class: "p-0",
                    children: ($$renderer7) => {
                      if (isLoadingKeys) {
                        $$renderer7.push("<!--[-->");
                        $$renderer7.push(`<div class="space-y-2 p-6"><!--[-->`);
                        const each_array = ensure_array_like(Array(3));
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          each_array[$$index];
                          $$renderer7.push(`<div class="flex items-center justify-between gap-4 py-2"><div class="space-y-1.5">`);
                          Skeleton($$renderer7, { class: "h-4 w-36" });
                          $$renderer7.push(`<!----> `);
                          Skeleton($$renderer7, { class: "h-3 w-24" });
                          $$renderer7.push(`<!----></div> `);
                          Skeleton($$renderer7, { class: "h-6 w-32" });
                          $$renderer7.push(`<!----> `);
                          Skeleton($$renderer7, { class: "h-5 w-16" });
                          $$renderer7.push(`<!----> `);
                          Skeleton($$renderer7, { class: "h-8 w-8 rounded-md" });
                          $$renderer7.push(`<!----></div>`);
                        }
                        $$renderer7.push(`<!--]--></div>`);
                      } else {
                        $$renderer7.push("<!--[!-->");
                        if (apiKeys.length === 0) {
                          $$renderer7.push("<!--[-->");
                          $$renderer7.push(`<div class="flex flex-col items-center justify-center px-6 py-12 text-center"><div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">`);
                          Key_round($$renderer7, { class: "h-6 w-6" });
                          $$renderer7.push(`<!----></div> <h3 class="mt-4 text-base font-semibold">No API keys yet</h3> <p class="mt-1 max-w-sm text-xs text-muted-foreground">Generate an API key to start integrating search and data services directly into your
								applications.</p> `);
                          Button($$renderer7, {
                            onclick: openGenerateDialog,
                            size: "sm",
                            class: "mt-5 gap-1.5",
                            children: ($$renderer8) => {
                              Plus($$renderer8, { class: "h-4 w-4" });
                              $$renderer8.push(`<!----> Generate API Key`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----></div>`);
                        } else {
                          $$renderer7.push("<!--[!-->");
                          if (filteredKeys.length === 0) {
                            $$renderer7.push("<!--[-->");
                            $$renderer7.push(`<div class="flex flex-col items-center justify-center px-6 py-12 text-center">`);
                            Search($$renderer7, { class: "h-8 w-8 text-muted-foreground" });
                            $$renderer7.push(`<!----> <h3 class="mt-3 text-sm font-semibold">No matching keys found</h3> <p class="mt-1 text-xs text-muted-foreground">No API keys match your filter "${escape_html(searchQuery)}".</p> `);
                            Button($$renderer7, {
                              variant: "outline",
                              size: "sm",
                              onclick: () => {
                                searchQuery = "";
                                statusFilter = "all";
                              },
                              class: "mt-4 text-xs",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Reset Filters`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----></div>`);
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push(`<div class="overflow-x-auto"><!---->`);
                            Table($$renderer7, {
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->`);
                                Table_header($$renderer8, {
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!---->`);
                                    Table_row($$renderer9, {
                                      class: "hover:bg-transparent",
                                      children: ($$renderer10) => {
                                        $$renderer10.push(`<!---->`);
                                        Table_head($$renderer10, {
                                          class: "w-[240px] text-xs font-semibold",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->Name`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_head($$renderer10, {
                                          class: "text-xs font-semibold",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->Key Token`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_head($$renderer10, {
                                          class: "text-xs font-semibold",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->Status`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_head($$renderer10, {
                                          class: "text-xs font-semibold",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->Created`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_head($$renderer10, {
                                          class: "text-xs font-semibold",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->Last Used`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_head($$renderer10, {
                                          class: "w-[70px] text-right text-xs font-semibold",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->Actions`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!---->`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer9.push(`<!---->`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer8.push(`<!----> <!---->`);
                                Table_body($$renderer8, {
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!--[-->`);
                                    const each_array_1 = ensure_array_like(filteredKeys);
                                    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                                      let key = each_array_1[$$index_1];
                                      $$renderer9.push(`<!---->`);
                                      Table_row($$renderer9, {
                                        class: "transition-colors hover:bg-muted/40",
                                        children: ($$renderer10) => {
                                          $$renderer10.push(`<!---->`);
                                          Table_cell($$renderer10, {
                                            class: "font-medium",
                                            children: ($$renderer11) => {
                                              $$renderer11.push(`<div class="flex items-center gap-2.5"><div${attr_class(`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${stringify(key.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}`)}>`);
                                              Key_round($$renderer11, { class: "h-3.5 w-3.5" });
                                              $$renderer11.push(`<!----></div> <div class="min-w-0"><p${attr_class(`truncate text-sm font-medium ${stringify(key.is_active ? "text-foreground" : "text-muted-foreground line-through")}`)}>${escape_html(key.name)}</p> <p class="text-[11px] text-muted-foreground">Added ${escape_html(formatShortDate(key.created_at))}</p></div></div>`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer10.push(`<!----> <!---->`);
                                          Table_cell($$renderer10, {
                                            children: ($$renderer11) => {
                                              $$renderer11.push(`<div class="flex items-center gap-1.5"><code class="rounded-md border border-border/60 bg-muted/60 px-2 py-1 font-mono text-xs font-medium tracking-wider text-foreground">${escape_html(key.masked_key)}</code> `);
                                              Button($$renderer11, {
                                                variant: "ghost",
                                                size: "icon-xs",
                                                onclick: () => copyToClipboard(key.masked_key, key.id),
                                                title: "Copy masked key identifier",
                                                class: "text-muted-foreground hover:text-foreground",
                                                children: ($$renderer12) => {
                                                  if (copiedKeyId === key.id) {
                                                    $$renderer12.push("<!--[-->");
                                                    Check($$renderer12, { class: "h-3.5 w-3.5 text-emerald-500" });
                                                  } else {
                                                    $$renderer12.push("<!--[!-->");
                                                    Copy($$renderer12, { class: "h-3.5 w-3.5" });
                                                  }
                                                  $$renderer12.push(`<!--]-->`);
                                                },
                                                $$slots: { default: true }
                                              });
                                              $$renderer11.push(`<!----></div>`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer10.push(`<!----> <!---->`);
                                          Table_cell($$renderer10, {
                                            children: ($$renderer11) => {
                                              if (key.is_active) {
                                                $$renderer11.push("<!--[-->");
                                                Badge($$renderer11, {
                                                  variant: "outline",
                                                  class: "border-emerald-600/30 bg-emerald-500/10 text-[11px] text-emerald-600 dark:text-emerald-400",
                                                  children: ($$renderer12) => {
                                                    $$renderer12.push(`<span class="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                              } else {
                                                $$renderer11.push("<!--[!-->");
                                                Badge($$renderer11, {
                                                  variant: "secondary",
                                                  class: "text-[11px] text-muted-foreground",
                                                  children: ($$renderer12) => {
                                                    $$renderer12.push(`<!---->Revoked`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                              }
                                              $$renderer11.push(`<!--]-->`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer10.push(`<!----> <!---->`);
                                          Table_cell($$renderer10, {
                                            class: "text-xs whitespace-nowrap text-muted-foreground",
                                            children: ($$renderer11) => {
                                              $$renderer11.push(`<!---->${escape_html(formatDate(key.created_at))}`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer10.push(`<!----> <!---->`);
                                          Table_cell($$renderer10, {
                                            class: "text-xs whitespace-nowrap",
                                            children: ($$renderer11) => {
                                              if (key.last_used_at) {
                                                $$renderer11.push("<!--[-->");
                                                $$renderer11.push(`<span class="text-foreground">${escape_html(formatDate(key.last_used_at))}</span>`);
                                              } else {
                                                $$renderer11.push("<!--[!-->");
                                                $$renderer11.push(`<span class="text-muted-foreground italic">Never</span>`);
                                              }
                                              $$renderer11.push(`<!--]-->`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer10.push(`<!----> <!---->`);
                                          Table_cell($$renderer10, {
                                            class: "text-right",
                                            children: ($$renderer11) => {
                                              if (key.is_active) {
                                                $$renderer11.push("<!--[-->");
                                                Button($$renderer11, {
                                                  variant: "ghost",
                                                  size: "icon-sm",
                                                  onclick: () => handleRevokeClick(key),
                                                  class: "text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
                                                  title: "Revoke API key",
                                                  children: ($$renderer12) => {
                                                    Trash_2($$renderer12, { class: "h-4 w-4" });
                                                  },
                                                  $$slots: { default: true }
                                                });
                                              } else {
                                                $$renderer11.push("<!--[!-->");
                                                $$renderer11.push(`<span class="text-xs text-muted-foreground select-none">—</span>`);
                                              }
                                              $$renderer11.push(`<!--]-->`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer10.push(`<!---->`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer9.push(`<!---->`);
                                    }
                                    $$renderer9.push(`<!--]-->`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer8.push(`<!---->`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----></div>`);
                          }
                          $$renderer7.push(`<!--]-->`);
                        }
                        $$renderer7.push(`<!--]-->`);
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Card($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Card_header($$renderer6, {
                    class: "p-4",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<div class="flex items-center gap-2">`);
                      Code_xml($$renderer7, { class: "h-5 w-5 text-primary" });
                      $$renderer7.push(`<!----> <!---->`);
                      Card_title($$renderer7, {
                        class: "text-base font-semibold",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Quickstart &amp; API Integration`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----></div> <!---->`);
                      Card_description($$renderer7, {
                        class: "text-xs",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Authenticate your requests by supplying your secret key in the <code class="font-mono font-semibold text-foreground">X-API-Key</code> request header.`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Card_content($$renderer6, {
                    class: "space-y-4",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<div class="flex flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-muted/30 p-3 text-xs"><span class="font-semibold text-foreground">Header format:</span> <code class="rounded border border-border bg-background px-2 py-0.5 font-mono font-medium text-primary">X-API-Key: live_...</code> <span class="text-muted-foreground">or</span> <code class="rounded border border-border bg-background px-2 py-0.5 font-mono font-medium text-primary">Authorization: Bearer live_...</code></div> <!---->`);
                      Tabs($$renderer7, {
                        class: "w-full",
                        get value() {
                          return activeCodeTab;
                        },
                        set value($$value) {
                          activeCodeTab = $$value;
                          $$settled = false;
                        },
                        children: ($$renderer8) => {
                          $$renderer8.push(`<div class="flex items-center justify-between border-b border-border pb-2"><!---->`);
                          Tabs_list($$renderer8, {
                            class: "h-8",
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->`);
                              Tabs_trigger($$renderer9, {
                                value: "curl",
                                class: "text-xs",
                                children: ($$renderer10) => {
                                  $$renderer10.push(`<!---->cURL`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer9.push(`<!----> <!---->`);
                              Tabs_trigger($$renderer9, {
                                value: "js",
                                class: "text-xs",
                                children: ($$renderer10) => {
                                  $$renderer10.push(`<!---->JavaScript / TS`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer9.push(`<!----> <!---->`);
                              Tabs_trigger($$renderer9, {
                                value: "python",
                                class: "text-xs",
                                children: ($$renderer10) => {
                                  $$renderer10.push(`<!---->Python`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer9.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Button($$renderer8, {
                            variant: "ghost",
                            size: "sm",
                            onclick: () => {
                              const snippet = activeCodeTab === "curl" ? sampleCurl : activeCodeTab === "js" ? sampleJs : samplePython;
                              copySnippet(snippet, activeCodeTab);
                            },
                            class: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
                            children: ($$renderer9) => {
                              if (copiedSnippetLang === activeCodeTab) {
                                $$renderer9.push("<!--[-->");
                                Check($$renderer9, { class: "h-3.5 w-3.5 text-emerald-500" });
                                $$renderer9.push(`<!----> <span class="text-emerald-500">Copied</span>`);
                              } else {
                                $$renderer9.push("<!--[!-->");
                                Copy($$renderer9, { class: "h-3.5 w-3.5" });
                                $$renderer9.push(`<!----> <span>Copy Code</span>`);
                              }
                              $$renderer9.push(`<!--]-->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----></div> <!---->`);
                          Tabs_content($$renderer8, {
                            value: "curl",
                            class: "mt-3",
                            children: ($$renderer9) => {
                              $$renderer9.push(`<div class="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground"><pre class="leading-relaxed"><code>curl -X POST https://mareno.io/api/search/web \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d "{\\"query\\": \\"python\\"}"</code></pre></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> <!---->`);
                          Tabs_content($$renderer8, {
                            value: "js",
                            class: "mt-3",
                            children: ($$renderer9) => {
                              $$renderer9.push(`<div class="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground"><pre class="leading-relaxed"><code>const response = await fetch("https://mareno.io/api/search/web", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.TAREN_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "distributed systems architecture"
  })
});

const data = await response.json();
console.log(data);</code></pre></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> <!---->`);
                          Tabs_content($$renderer8, {
                            value: "python",
                            class: "mt-3",
                            children: ($$renderer9) => {
                              $$renderer9.push(`<div class="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground"><pre class="leading-relaxed"><code>import os
import requests

api_key = os.getenv("TAREN_API_KEY")
url = "https://mareno.io/api/search/web"

headers = {
    "X-API-Key": api_key,
    "Content-Type": "application/json"
}

payload = {
    "query": "distributed systems architecture"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())</code></pre></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <div class="grid grid-cols-1 gap-3 pt-2 pb-4 sm:grid-cols-3"><div class="rounded-lg border border-border/50 bg-background/50 p-3"><div class="flex items-center gap-1.5 text-xs font-semibold">`);
                      Shield_check($$renderer7, { class: "h-4 w-4 text-emerald-500" });
                      $$renderer7.push(`<!----> <span>Keep Secrets Safe</span></div> <p class="mt-1 text-[11px] leading-normal text-muted-foreground">Never commit API keys to GitHub or expose them in client-side frontends.</p></div> <div class="rounded-lg border border-border/50 bg-background/50 p-3"><div class="flex items-center gap-1.5 text-xs font-semibold">`);
                      Terminal($$renderer7, { class: "h-4 w-4 text-blue-500" });
                      $$renderer7.push(`<!----> <span>Use Env Variables</span></div> <p class="mt-1 text-[11px] leading-normal text-muted-foreground">Store keys inside server environment variables such as <code class="font-mono">.env.local</code>.</p></div> <div class="rounded-lg border border-border/50 bg-background/50 p-3"><div class="flex items-center gap-1.5 text-xs font-semibold">`);
                      Refresh_cw($$renderer7, { class: "h-4 w-4 text-amber-500" });
                      $$renderer7.push(`<!----> <span>Rotate on Breach</span></div> <p class="mt-1 text-[11px] leading-normal text-muted-foreground">If you suspect an API key was compromised, revoke it immediately and create a new
								one.</p></div></div>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            }
          });
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----> <!---->`);
      Dialog($$renderer3, {
        onOpenChange: (open) => !open && closeGenerateDialog(),
        get open() {
          return showGenerateDialog;
        },
        set open($$value) {
          showGenerateDialog = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "sm:max-w-md",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
                  Key_round($$renderer6, { class: "h-4 w-4" });
                  $$renderer6.push(`<!----></div> <div><!---->`);
                  Dialog_title($$renderer6, {
                    class: "text-base font-semibold",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(generatedKey ? "API Key Generated" : "Create New API Key")}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    class: "text-xs",
                    children: ($$renderer7) => {
                      if (generatedKey) {
                        $$renderer7.push("<!--[-->");
                        $$renderer7.push(`Store your API key in a secure location.`);
                      } else {
                        $$renderer7.push("<!--[!-->");
                        $$renderer7.push(`Give your API key a descriptive name to identify its usage.`);
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              if (!generatedKey) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<form class="space-y-4 pt-1"><div class="space-y-2">`);
                Label($$renderer5, {
                  for: "key-name",
                  class: "text-xs font-medium",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Key Name`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "key-name",
                  placeholder: "e.g. Production Backend, CI Pipeline, Local CLI",
                  maxlength: 255,
                  disabled: isGeneratingKey,
                  oninput: () => keyNameError = "",
                  class: "text-sm",
                  autofocus: true,
                  get value() {
                    return newKeyName;
                  },
                  set value($$value) {
                    newKeyName = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> `);
                if (keyNameError) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<p class="text-xs text-destructive">${escape_html(keyNameError)}</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div> <div class="space-y-1.5 rounded-lg border border-border/60 bg-muted/40 p-3 text-xs"><p class="font-semibold text-foreground">Security information:</p> <ul class="list-inside list-disc space-y-1 text-muted-foreground"><li>Keys are encrypted using <strong>Argon2id</strong> hashing.</li> <li>The full key will only be displayed <strong>once</strong> upon creation.</li> <li>You can revoke access at any time from this dashboard.</li></ul></div> <!---->`);
                Dialog_footer($$renderer5, {
                  class: "pt-2",
                  children: ($$renderer6) => {
                    Button($$renderer6, {
                      variant: "outline",
                      size: "sm",
                      type: "button",
                      onclick: closeGenerateDialog,
                      disabled: isGeneratingKey,
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Cancel`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Button($$renderer6, {
                      size: "sm",
                      type: "submit",
                      disabled: isGeneratingKey,
                      class: "gap-1.5",
                      children: ($$renderer7) => {
                        {
                          $$renderer7.push("<!--[!-->");
                          Sparkles($$renderer7, { class: "h-3.5 w-3.5" });
                          $$renderer7.push(`<!----> <span>Generate Key</span>`);
                        }
                        $$renderer7.push(`<!--]-->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></form>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="space-y-4 pt-1"><!---->`);
                Alert($$renderer5, {
                  class: "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200",
                  children: ($$renderer6) => {
                    Triangle_alert($$renderer6, { class: "h-4 w-4 text-amber-600 dark:text-amber-400" });
                    $$renderer6.push(`<!----> <!---->`);
                    Alert_title($$renderer6, {
                      class: "text-xs font-semibold",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Copy your secret key`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Alert_description($$renderer6, {
                      class: "text-xs",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->This is the only time your full API key will be shown. Make sure to copy and store it
						securely.`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="space-y-1.5">`);
                Label($$renderer5, {
                  class: "text-xs font-medium text-muted-foreground",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Generated Secret Key (${escape_html(generatedKey.name)})`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="flex gap-1.5"><div class="relative flex-1">`);
                Input($$renderer5, {
                  type: isKeyVisible ? "text" : "password",
                  value: generatedKey.key,
                  readonly: true,
                  class: "bg-muted/50 pr-9 font-mono text-xs select-all"
                });
                $$renderer5.push(`<!----> <button type="button" class="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"${attr("title", isKeyVisible ? "Hide key" : "Show key")}>`);
                if (isKeyVisible) {
                  $$renderer5.push("<!--[-->");
                  Eye_off($$renderer5, { class: "h-4 w-4" });
                } else {
                  $$renderer5.push("<!--[!-->");
                  Eye($$renderer5, { class: "h-4 w-4" });
                }
                $$renderer5.push(`<!--]--></button></div> `);
                Button($$renderer5, {
                  variant: "outline",
                  size: "sm",
                  onclick: () => copyToClipboard(generatedKey.key, "generated", true),
                  class: `gap-1.5 ${stringify(isGeneratedCopied ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "")}`,
                  children: ($$renderer6) => {
                    if (isGeneratedCopied) {
                      $$renderer6.push("<!--[-->");
                      Check($$renderer6, { class: "h-3.5 w-3.5 text-emerald-500" });
                      $$renderer6.push(`<!----> <span>Copied!</span>`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                      Copy($$renderer6, { class: "h-3.5 w-3.5" });
                      $$renderer6.push(`<!----> <span>Copy</span>`);
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div> <div class="space-y-1.5 rounded-lg border border-border/60 bg-muted/40 p-3 text-xs"><p class="font-semibold text-foreground">Usage example:</p> <code class="block overflow-x-auto rounded border border-border bg-background p-2 font-mono text-[11px] text-foreground">curl -X POST https://mareno.io/api/search/web \\<br/>   -H "X-API-Key: ${escape_html(generatedKey.key)}" \\<br/>   -H "Content-Type: application/json" \\<br/>   -d '{"query": "python"}'</code></div> <!---->`);
                Dialog_footer($$renderer5, {
                  class: "pt-2",
                  children: ($$renderer6) => {
                    Button($$renderer6, {
                      onclick: closeGenerateDialog,
                      class: "w-full gap-1.5",
                      size: "sm",
                      children: ($$renderer7) => {
                        Circle_check($$renderer7, { class: "h-4 w-4" });
                        $$renderer7.push(`<!----> <span>Done (I have copied my key)</span>`);
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <!---->`);
      Dialog($$renderer3, {
        open: !!keyToRevoke,
        onOpenChange: (open) => !open && (keyToRevoke = null),
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "sm:max-w-md",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex items-center gap-2 text-destructive"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">`);
                  Triangle_alert($$renderer6, { class: "h-4 w-4 text-destructive" });
                  $$renderer6.push(`<!----></div> <!---->`);
                  Dialog_title($$renderer6, {
                    class: "text-base font-semibold text-foreground",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Revoke API Key`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div> <!---->`);
                  Dialog_description($$renderer6, {
                    class: "pt-2 text-xs leading-normal text-muted-foreground",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Are you sure you want to revoke the API key <strong class="text-foreground">"${escape_html(keyToRevoke?.name)}"</strong> (${escape_html(keyToRevoke?.masked_key)})?`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="space-y-1 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive"><p class="font-semibold">Warning: This action is irreversible.</p> <p class="text-[11px] leading-relaxed">Any applications, background jobs, or integrations currently using this key will immediately
				fail authentication.</p></div> <!---->`);
              Dialog_footer($$renderer5, {
                class: "pt-2",
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    variant: "outline",
                    size: "sm",
                    onclick: () => keyToRevoke = null,
                    disabled: isRevoking,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Cancel`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "destructive",
                    size: "sm",
                    onclick: executeRevokeKey,
                    disabled: isRevoking,
                    class: "gap-1.5",
                    children: ($$renderer7) => {
                      if (isRevoking) {
                        $$renderer7.push("<!--[-->");
                        Refresh_cw($$renderer7, { class: "h-3.5 w-3.5 animate-spin" });
                        $$renderer7.push(`<!----> <span>Revoking...</span>`);
                      } else {
                        $$renderer7.push("<!--[!-->");
                        Trash_2($$renderer7, { class: "h-3.5 w-3.5" });
                        $$renderer7.push(`<!----> <span>Revoke Key</span>`);
                      }
                      $$renderer7.push(`<!--]-->`);
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
//# sourceMappingURL=_page.svelte-BSLkYatG.js.map
