import { e as escape_html, g as getContext } from './context-CU6onIa8.js';
import './client-1qnLn_6X.js';
import './state.svelte-CKPkeQuZ.js';
import './exports-BOROuGf9.js';
import './client2-Delu94aQ.js';
import './index-rfN3dtkt.js';

function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-C5Y4YE38.js.map
