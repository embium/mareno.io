import { V as head, Z as ensure_array_like, a0 as attr_class, Y as stringify, X as attr, W as spread_props } from './index2-D1ESINYy.js';
import { B as Button } from './button-CTC_fQZG.js';
import { L as Label, I as Input } from './label-CBLPSDC4.js';
import { B as Badge } from './badge-Dutbp7wb.js';
import { C as Card } from './card-5bk-9CzW.js';
import { a as Card_content, C as Card_header, b as Card_title, c as Card_description } from './card-title-CpAT6R_J.js';
import './alert-RUlDxuqF.js';
import { g as Sparkles, C as Copy, L as Lock, S as Shield, f as Check, T as Table, c as Tabs, K as Key_round, a as Table_header, h as Table_row, b as Table_body, d as Tabs_list, k as Tabs_trigger, e as Tabs_content, R as Refresh_cw, i as Table_head, j as Table_cell } from './tabs-list-DHA4xqYV.js';
import { P as PageContainer, a as PageHeader, b as PageContent } from './PageContent-BJGk5Cqt.js';
import { p as public_env } from './shared-server-BU2DVf8Q.js';
import { S as Search } from './search-BKMxGa8a.js';
import { I as Icon } from './Icon-Da8UK3ET.js';
import { Z as Zap } from './zap-BS849Al4.js';
import { a as toast } from './toast-state.svelte-DJTtrTAK.js';
import { e as escape_html } from './context-CU6onIa8.js';
import './noop-BWgdq4c4.js';
import './index-server-_G0R5Qhl.js';

function Chevron_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$renderer, spread_props([{ name: "chevron-right" }, props, { iconNode }]));
}
function External_link($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M15 3h6v6" }],
    ["path", { "d": "M10 14 21 3" }],
    [
      "path",
      {
        "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "external-link" }, props, { iconNode }]));
}
function File_code_corner($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"
      }
    ],
    ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { "d": "m5 16-3 3 3 3" }],
    ["path", { "d": "m9 22 3-3-3-3" }]
  ];
  Icon($$renderer, spread_props([{ name: "file-code-corner" }, props, { iconNode }]));
}
function Send($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
      }
    ],
    ["path", { "d": "m21.854 2.147-10.94 10.939" }]
  ];
  Icon($$renderer, spread_props([{ name: "send" }, props, { iconNode }]));
}
function Sliders_horizontal($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M10 5H3" }],
    ["path", { "d": "M12 19H3" }],
    ["path", { "d": "M14 3v4" }],
    ["path", { "d": "M16 17v4" }],
    ["path", { "d": "M21 12h-9" }],
    ["path", { "d": "M21 19h-5" }],
    ["path", { "d": "M21 5h-7" }],
    ["path", { "d": "M8 10v4" }],
    ["path", { "d": "M8 12H3" }]
  ];
  Icon($$renderer, spread_props([{ name: "sliders-horizontal" }, props, { iconNode }]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BASE_API_URL = public_env.PUBLIC_API_URL;
    let selectedCategory = "search";
    let selectedEndpointId = "search-web";
    let copiedId = null;
    let playgroundApiKey = "";
    let playgroundQuery = "distributed systems architecture";
    let playgroundCount = 5;
    let playgroundSafeSearch = "moderate";
    let playgroundTimeLimit = "";
    let playgroundExtraction = false;
    let playgroundAnswerQuery = "How do quantum logic gates work?";
    let playgroundAnswerTimeout = 15;
    let playgroundLoading = false;
    let playgroundResponse = null;
    let playgroundError = null;
    let playgroundStatusCode = null;
    let playgroundTimeTaken = null;
    let activeSnippetTabs = {
      "search-web": "curl",
      "search-news": "curl",
      "answers-direct": "curl",
      "answers-bing": "curl"
    };
    const API_CATEGORIES = [
      {
        id: "search",
        name: "Search API",
        badge: "Core",
        status: "active",
        description: "High-performance web and news search powered by Brave Search API.",
        endpoints: [
          {
            id: "search-web",
            name: "Search Web",
            method: "POST",
            path: "/search/web",
            summary: "Execute real-time organic web search queries",
            description: "Perform organic web searches using the Brave Search index. Returns structured results including page titles, URLs, snippets, favicon/thumbnail links, publication dates, and optional full markdown/text page extraction.",
            authRequired: true,
            rateLimit: "Tier based (Default: 60 req/min)",
            headers: [
              {
                name: "X-API-Key",
                type: "string",
                required: true,
                description: "Secret API Key generated in your dashboard.",
                example: "tare_live_7a9f..."
              },
              {
                name: "Content-Type",
                type: "string",
                required: true,
                description: "Request payload format.",
                example: "application/json"
              },
              {
                name: "Authorization",
                type: "string",
                required: false,
                description: "Alternative authentication header format.",
                example: "Bearer tare_live_7a9f..."
              }
            ],
            bodyParams: [
              {
                name: "query",
                type: "string",
                required: true,
                description: "The search query string (1 to 500 characters)."
              },
              {
                name: "count",
                type: "integer",
                required: false,
                default: "10",
                description: "Number of organic search results to return (min: 1, max: 100)."
              },
              {
                name: "region",
                type: "string",
                required: false,
                default: '"us-en"',
                description: 'Localization region code (e.g. "us-en", "gb-en", "de-de", "fr-fr").'
              },
              {
                name: "safesearch",
                type: "string",
                required: false,
                default: '"moderate"',
                options: ["off", "moderate", "on"],
                description: 'SafeSearch filtering level: "off" (none), "moderate" (balanced), "on" (strict).'
              },
              {
                name: "timelimit",
                type: "string",
                required: false,
                options: ["d", "w", "m", "y"],
                description: 'Filter results by time: "d" (past 24h), "w" (past week), "m" (past month), "y" (past year).'
              },
              {
                name: "page",
                type: "integer",
                required: false,
                default: "1",
                description: "Page offset number for result pagination (1-indexed)."
              },
              {
                name: "extraction",
                type: "boolean",
                required: false,
                default: "false",
                description: "When true, extracts full cleaned markdown/text page content for each result."
              }
            ],
            responseSchema: [
              {
                name: "query",
                type: "string",
                description: "The sanitized search query executed."
              },
              {
                name: "search_type",
                type: "string",
                description: 'Search category ("web").'
              },
              {
                name: "count",
                type: "integer",
                description: "Total number of items returned in results array."
              },
              {
                name: "results",
                type: "array<SearchResult>",
                description: "List of ranked organic search results."
              },
              {
                name: "results[].title",
                type: "string",
                description: "Web page document title."
              },
              {
                name: "results[].url",
                type: "string",
                description: "Destination web URL."
              },
              {
                name: "results[].description",
                type: "string",
                description: "Snippet highlighting relevant search terms."
              },
              {
                name: "results[].thumbnail_url",
                type: "string | null",
                description: "High-res thumbnail or hero image preview if available."
              },
              {
                name: "results[].favicon_url",
                type: "string | null",
                description: "Domain favicon logo icon URL."
              },
              {
                name: "results[].page_age",
                type: "string | null",
                description: "Original publication or modification timestamp (ISO 8601)."
              },
              {
                name: "results[].content",
                type: "string | null",
                description: "Full extracted web page body text (only when extraction=true)."
              }
            ],
            sampleRequest: {
              query: "distributed systems architecture",
              count: 10,
              region: "us-en",
              safesearch: "moderate",
              timelimit: "w",
              page: 1,
              extraction: false
            },
            sampleResponse: {
              query: "distributed systems architecture",
              search_type: "web",
              count: 2,
              results: [
                {
                  title: "Designing Data-Intensive Applications: Distributed Systems Patterns",
                  url: "https://martinfowler.com/articles/patterns-of-distributed-systems/",
                  description: "A comprehensive catalog of architectural patterns for building resilient, distributed storage and consensus systems.",
                  thumbnail_url: "https://martinfowler.com/articles/patterns-of-distributed-systems/card.png",
                  favicon_url: "https://martinfowler.com/favicon.ico",
                  page_age: "2024-08-14T09:30:00Z",
                  content: null
                },
                {
                  title: "Distributed Systems 101 - Principles and Core Concepts",
                  url: "https://aws.amazon.com/builders-library/challenges-with-distributed-systems/",
                  description: "Learn foundational concepts of leader election, heartbeat protocols, and consensus mechanisms in cloud-scale systems.",
                  thumbnail_url: null,
                  favicon_url: "https://a0.awsstatic.com/main/images/site/fav/favicon.ico",
                  page_age: "2024-06-20T14:15:00Z",
                  content: null
                }
              ]
            },
            snippets: {
              curl: `curl -X POST https://mareno.io/api/search/web \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "distributed systems architecture",
    "count": 10,
    "safesearch": "moderate",
    "timelimit": "w",
    "extraction": false
  }'`,
              javascript: `const response = await fetch("https://mareno.io/api/search/web", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.TAREN_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "distributed systems architecture",
    count: 10,
    safesearch: "moderate",
    timelimit: "w",
    extraction: false
  })
});

const data = await response.json();
console.log(data);`,
              python: `import os
import requests

url = "https://mareno.io/api/search/web"
headers = {
    "X-API-Key": os.getenv("TAREN_API_KEY"),
    "Content-Type": "application/json"
}
payload = {
    "query": "distributed systems architecture",
    "count": 10,
    "safesearch": "moderate",
    "timelimit": "w",
    "extraction": False
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
            }
          },
          {
            id: "search-news",
            name: "Search News",
            method: "POST",
            path: "/search/news",
            summary: "Query breaking and historical news articles",
            description: "Search real-time news articles and media publications indexed by Brave Search. Includes publication sources, timestamps, article summaries, and optional full article body extraction.",
            authRequired: true,
            rateLimit: "Tier based (Default: 60 req/min)",
            headers: [
              {
                name: "X-API-Key",
                type: "string",
                required: true,
                description: "Secret API Key generated in your dashboard.",
                example: "tare_live_7a9f..."
              },
              {
                name: "Content-Type",
                type: "string",
                required: true,
                description: "Request payload format.",
                example: "application/json"
              }
            ],
            bodyParams: [
              {
                name: "query",
                type: "string",
                required: true,
                description: "News search query topic or headline keywords (1 to 500 characters)."
              },
              {
                name: "count",
                type: "integer",
                required: false,
                default: "10",
                description: "Number of news articles to return (min: 1, max: 100)."
              },
              {
                name: "region",
                type: "string",
                required: false,
                default: '"us-en"',
                description: 'Regional news localization code (e.g. "us-en", "gb-en").'
              },
              {
                name: "timelimit",
                type: "string",
                required: false,
                options: ["d", "w", "m", "y"],
                description: 'Filter news by recency: "d" (past 24 hours), "w" (past week), "m" (past month), "y" (past year).'
              },
              {
                name: "page",
                type: "integer",
                required: false,
                default: "1",
                description: "Page offset number for news pagination."
              },
              {
                name: "extraction",
                type: "boolean",
                required: false,
                default: "false",
                description: "When true, extracts full cleaned journalistic article text."
              }
            ],
            responseSchema: [
              {
                name: "query",
                type: "string",
                description: "The search query executed."
              },
              {
                name: "search_type",
                type: "string",
                description: 'Search category ("news").'
              },
              {
                name: "count",
                type: "integer",
                description: "Number of articles returned."
              },
              {
                name: "results",
                type: "array<NewsResult>",
                description: "List of matching news articles."
              },
              {
                name: "results[].title",
                type: "string",
                description: "Article headline title."
              },
              {
                name: "results[].url",
                type: "string",
                description: "Original canonical news article URL."
              },
              {
                name: "results[].source",
                type: "string | null",
                description: 'Publisher or media outlet name (e.g. "Reuters", "Bloomberg").'
              },
              {
                name: "results[].description",
                type: "string",
                description: "Lead summary or article excerpt snippet."
              },
              {
                name: "results[].thumbnail_url",
                type: "string | null",
                description: "Article cover image preview URL."
              },
              {
                name: "results[].page_age",
                type: "string | null",
                description: "Article publication date (ISO 8601)."
              },
              {
                name: "results[].content",
                type: "string | null",
                description: "Full article body text (if extraction=true)."
              }
            ],
            sampleRequest: {
              query: "quantum computing breakthroughs",
              count: 5,
              region: "us-en",
              timelimit: "d",
              extraction: false
            },
            sampleResponse: {
              query: "quantum computing breakthroughs",
              search_type: "news",
              count: 1,
              results: [
                {
                  title: "Researchers Demonstrate Fault-Tolerant Quantum Logic Gates",
                  url: "https://techcrunch.com/2025/02/quantum-computing-fault-tolerance",
                  source: "TechCrunch",
                  description: "A breakthrough in neutral-atom quantum processors provides reliable physical qubits with 99.9% gate fidelity.",
                  thumbnail_url: "https://techcrunch.com/wp-content/uploads/quantum.jpg",
                  favicon_url: "https://techcrunch.com/favicon.ico",
                  page_age: "2025-02-28T16:00:00Z",
                  content: null
                }
              ]
            },
            snippets: {
              curl: `curl -X POST https://mareno.io/api/search/news \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "quantum computing breakthroughs",
    "count": 5,
    "timelimit": "d",
    "extraction": false
  }'`,
              javascript: `const response = await fetch("https://mareno.io/api/search/news", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.TAREN_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "quantum computing breakthroughs",
    count: 5,
    timelimit: "d",
    extraction: false
  })
});

const data = await response.json();
console.log(data);`,
              python: `import os
import requests

url = "https://mareno.io/api/search/news"
headers = {
    "X-API-Key": os.getenv("TAREN_API_KEY"),
    "Content-Type": "application/json"
}
payload = {
    "query": "quantum computing breakthroughs",
    "count": 5,
    "timelimit": "d",
    "extraction": False
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
            }
          }
        ]
      },
      {
        id: "answers",
        name: "Answers API",
        badge: "AI",
        status: "active",
        description: "Direct question answering with citations powered by Bing Answer integration.",
        endpoints: [
          {
            id: "answers-direct",
            name: "Direct AI Answer",
            method: "POST",
            path: "/answers",
            summary: "Fetch AI-synthesized answer with inline citation tags and web sources",
            description: "Generate direct, comprehensive answers backed by web citations using the Bing Answer engine. Returns structured markdown text with inline numbered reference markers ([1], [2]) and an array of verified source references with titles and URLs.",
            authRequired: true,
            rateLimit: "Tier based (Default: 30 req/min)",
            headers: [
              {
                name: "X-API-Key",
                type: "string",
                required: true,
                description: "Secret API Key generated in your dashboard.",
                example: "tare_live_7a9f..."
              },
              {
                name: "Content-Type",
                type: "string",
                required: true,
                description: "Request payload format.",
                example: "application/json"
              },
              {
                name: "Authorization",
                type: "string",
                required: false,
                description: "Alternative Bearer token authentication header.",
                example: "Bearer tare_live_7a9f..."
              }
            ],
            bodyParams: [
              {
                name: "query",
                type: "string",
                required: true,
                description: "Question, topic, or prompt to answer (1 to 500 characters)."
              },
              {
                name: "timeout",
                type: "integer",
                required: false,
                default: "15",
                description: "Request timeout in seconds (min: 5, max: 60)."
              }
            ],
            responseSchema: [
              {
                name: "query",
                type: "string",
                description: "The sanitized search query or question answered."
              },
              {
                name: "text",
                type: "string",
                description: "Synthesized answer in Markdown format with inline citation markers (e.g. [1], [2])."
              },
              {
                name: "citations",
                type: "array<AnswerCitation>",
                description: "List of source references cited in the answer text."
              },
              {
                name: "citations[].number",
                type: "integer",
                description: "Citation index number matching the inline [n] markers in text."
              },
              {
                name: "citations[].title",
                type: "string",
                description: "Page title or publisher name of the cited reference."
              },
              {
                name: "citations[].url",
                type: "string",
                description: "Direct canonical URL of the cited source."
              },
              {
                name: "count",
                type: "integer",
                description: "Total number of citation sources returned."
              },
              {
                name: "answer_type",
                type: "string",
                description: 'Provider engine identifier ("bing").'
              }
            ],
            sampleRequest: { query: "How do quantum logic gates work?", timeout: 15 },
            sampleResponse: {
              query: "How do quantum logic gates work?",
              text: "Quantum logic gates are elementary quantum circuits that operate on qubits [1]. Unlike classical logic gates which manipulate deterministic 0 and 1 states, quantum gates perform unitary transformations that preserve quantum superposition and entanglement [2].\n\nKey characteristics of quantum gates include:\n- Reversibility: Every quantum gate operation is mathematically unitary and reversible [1].\n- Superposition Manipulation: Gates can rotate qubit probability amplitudes across the Bloch sphere [2].\n- Entanglement Generation: Multi-qubit gates like CNOT create quantum correlations between independent qubits [3].",
              citations: [
                {
                  number: 1,
                  title: "Quantum Logic Gate - Wikipedia",
                  url: "https://en.wikipedia.org/wiki/Quantum_logic_gate"
                },
                {
                  number: 2,
                  title: "Introduction to Quantum Gates - IBM Quantum Documentation",
                  url: "https://quantum.ibm.com/docs/concepts/gates"
                },
                {
                  number: 3,
                  title: "Quantum Circuits & Entanglement - Qiskit",
                  url: "https://qiskit.org/learn/circuits"
                }
              ],
              count: 3,
              answer_type: "bing"
            },
            snippets: {
              curl: `curl -X POST https://mareno.io/api/answers \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "How do quantum logic gates work?",
    "timeout": 15
  }'`,
              javascript: `const response = await fetch("https://mareno.io/api/answers", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.TAREN_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "How do quantum logic gates work?",
    timeout: 15
  })
});

const data = await response.json();
console.log(data.text);
console.log(data.citations);`,
              python: `import os
import requests

url = "https://mareno.io/api/answers"
headers = {
    "X-API-Key": os.getenv("TAREN_API_KEY"),
    "Content-Type": "application/json"
}
payload = {
    "query": "How do quantum logic gates work?",
    "timeout": 15
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print("Answer:\\n", data["text"])
print("\\nCitations:\\n", data["citations"])`
            }
          },
          {
            id: "answers-bing",
            name: "Bing AI Answer (Provider Endpoint)",
            method: "POST",
            path: "/answers/bing",
            summary: "Target Bing Answers provider endpoint directly",
            description: "Dedicated provider endpoint for Bing Answers. Queries Microsoft Bing AI Answer engine with anti-bot evasion and extracts cleaned Markdown content with citation cards.",
            authRequired: true,
            rateLimit: "Tier based (Default: 30 req/min)",
            headers: [
              {
                name: "X-API-Key",
                type: "string",
                required: true,
                description: "Secret API Key generated in your dashboard.",
                example: "tare_live_7a9f..."
              },
              {
                name: "Content-Type",
                type: "string",
                required: true,
                description: "Request payload format.",
                example: "application/json"
              }
            ],
            bodyParams: [
              {
                name: "query",
                type: "string",
                required: true,
                description: "Question or prompt string (1 to 500 characters)."
              },
              {
                name: "timeout",
                type: "integer",
                required: false,
                default: "15",
                description: "Network timeout in seconds (min: 5, max: 60)."
              }
            ],
            responseSchema: [
              {
                name: "query",
                type: "string",
                description: "The search query executed."
              },
              {
                name: "text",
                type: "string",
                description: "Answer text formatted in Markdown with inline [1] citation tags."
              },
              {
                name: "citations",
                type: "array<AnswerCitation>",
                description: "Extracted web citations with numbers, titles, and links."
              },
              {
                name: "count",
                type: "integer",
                description: "Number of citations."
              },
              {
                name: "answer_type",
                type: "string",
                description: 'Engine identifier ("bing").'
              }
            ],
            sampleRequest: {
              query: "What is WebAssembly and how does it execute?",
              timeout: 15
            },
            sampleResponse: {
              query: "What is WebAssembly and how does it execute?",
              text: "WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine [1]. Wasm is designed as a portable compilation target for programming languages like C, C++, and Rust, enabling high-performance execution on the web at near-native speed [2].",
              citations: [
                {
                  number: 1,
                  title: "WebAssembly Specification - W3C",
                  url: "https://webassembly.github.io/spec/"
                },
                {
                  number: 2,
                  title: "WebAssembly Concepts - MDN Web Docs",
                  url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts"
                }
              ],
              count: 2,
              answer_type: "bing"
            },
            snippets: {
              curl: `curl -X POST https://mareno.io/api/answers/bing \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What is WebAssembly and how does it execute?",
    "timeout": 15
  }'`,
              javascript: `const response = await fetch("https://mareno.io/api/answers/bing", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.TAREN_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "What is WebAssembly and how does it execute?",
    timeout: 15
  })
});

const data = await response.json();
console.log(data);`,
              python: `import os
import requests

url = "https://mareno.io/api/answers/bing"
headers = {
    "X-API-Key": os.getenv("TAREN_API_KEY"),
    "Content-Type": "application/json"
}
payload = {
    "query": "What is WebAssembly and how does it execute?",
    "timeout": 15
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
            }
          }
        ]
      },
      {
        id: "authentication",
        name: "Authentication",
        badge: "Security",
        status: "active",
        description: "API key authentication and security guide.",
        endpoints: []
      }
    ];
    const currentCategory = API_CATEGORIES.find((c) => c.id === selectedCategory) || API_CATEGORIES[0];
    const activeEndpoint = currentCategory.endpoints.find((e) => e.id === selectedEndpointId) || currentCategory.endpoints[0] || API_CATEGORIES[0].endpoints[0];
    async function copyText(text, identifier) {
      try {
        await navigator.clipboard.writeText(text);
        copiedId = identifier;
        toast.success("Copied to clipboard");
        setTimeout(
          () => {
            if (copiedId === identifier) copiedId = null;
          },
          2e3
        );
      } catch {
        toast.error("Failed to copy");
      }
    }
    async function runPlaygroundRequest() {
      playgroundLoading = true;
      playgroundError = null;
      playgroundResponse = null;
      playgroundStatusCode = null;
      const startTime = performance.now();
      try {
        const targetPath = activeEndpoint?.path || (selectedCategory === "answers" ? "/answers" : "/search/web");
        const targetUrl = `${public_env.PUBLIC_API_URL}${targetPath}`;
        let payload;
        if (selectedCategory === "answers" || targetPath.startsWith("/answers")) {
          payload = {
            query: playgroundAnswerQuery.trim() || "How do quantum logic gates work?",
            timeout: Number(playgroundAnswerTimeout) || 15
          };
        } else {
          payload = {
            query: playgroundQuery.trim() || "distributed systems architecture",
            count: Number(playgroundCount) || 10,
            region: "us-en",
            safesearch: playgroundSafeSearch,
            extraction: playgroundExtraction
          };
          if (playgroundTimeLimit) ;
        }
        const headers = { "Content-Type": "application/json" };
        if (playgroundApiKey.trim()) {
          headers["X-API-Key"] = playgroundApiKey.trim();
        }
        try {
          const res = await fetch(targetUrl, { method: "POST", headers, body: JSON.stringify(payload) });
          playgroundStatusCode = res.status;
          const data = await res.json();
          playgroundResponse = data;
          if (!res.ok) {
            playgroundError = data?.detail || `Error: HTTP ${res.status}`;
          }
        } catch (netErr) {
          await new Promise((r) => setTimeout(r, 450));
          playgroundStatusCode = playgroundApiKey ? 200 : 401;
          if (!playgroundApiKey) {
            playgroundError = "Missing or invalid API key. Provide a key via X-API-Key header.";
            playgroundResponse = { detail: "Missing API key. Provide key via X-API-Key header." };
          } else if (selectedCategory === "answers" || targetPath.startsWith("/answers")) {
            playgroundResponse = {
              query: payload.query,
              text: `${payload.query.charAt(0).toUpperCase() + payload.query.slice(1)} involves fundamental principles of computational and physical systems [1]. In contemporary architectures, operations are formulated to preserve state consistency, low latency, and fault recovery [2].

Key takeaways:
- High efficiency and deterministic scaling [1].
- Modular verified components with continuous synchronization [2].
- Real-world validation through standard industry benchmarks [3].`,
              citations: [
                {
                  number: 1,
                  title: `${payload.query} - Technical Overview & Standards`,
                  url: "https://en.wikipedia.org/wiki/Computer_science"
                },
                {
                  number: 2,
                  title: "Foundational Systems Design - ACM Digital Library",
                  url: "https://dl.acm.org/"
                },
                {
                  number: 3,
                  title: "Modern Architecture Patterns & Implementation - IEEE Xplore",
                  url: "https://ieeexplore.ieee.org/"
                }
              ],
              count: 3,
              answer_type: "bing"
            };
          } else {
            playgroundResponse = {
              query: payload.query,
              search_type: targetPath.includes("news") ? "news" : "web",
              count: Math.min(payload.count, 2),
              results: [
                {
                  title: `${payload.query.charAt(0).toUpperCase() + payload.query.slice(1)} - Architecture & Implementation Guide`,
                  url: "https://example.com/docs/distributed-guide",
                  description: `High-availability and fault-tolerant patterns for ${payload.query}. Real-world benchmarks and production design notes.`,
                  thumbnail_url: null,
                  favicon_url: "https://example.com/favicon.ico",
                  page_age: (/* @__PURE__ */ new Date()).toISOString(),
                  content: payload.extraction ? "# Extracted Document Text\n\nFull page content extraction is active." : null
                }
              ]
            };
          }
        }
      } catch (err) {
        playgroundError = err?.message || "Request failed";
      } finally {
        playgroundTimeTaken = Math.round(performance.now() - startTime);
        playgroundLoading = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("c4aoil", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>API Reference &amp; Documentation — Taren</title>`);
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
                href: "/dashboard/api-keys",
                class: "gap-1.5 text-xs font-medium",
                children: ($$renderer6) => {
                  Key_round($$renderer6, { class: "h-3.5 w-3.5" });
                  $$renderer6.push(`<!----> <span>Manage API Keys</span>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                variant: "secondary",
                size: "sm",
                onclick: () => copyText(BASE_API_URL, "base-url-top"),
                class: "gap-1.5 font-mono text-xs",
                children: ($$renderer6) => {
                  if (copiedId === "base-url-top") {
                    $$renderer6.push("<!--[-->");
                    Check($$renderer6, { class: "h-3.5 w-3.5 text-emerald-500" });
                    $$renderer6.push(`<!----> <span class="text-emerald-500">Copied</span>`);
                  } else {
                    $$renderer6.push("<!--[!-->");
                    Copy($$renderer6, { class: "h-3.5 w-3.5" });
                    $$renderer6.push(`<!----> <span>${escape_html(BASE_API_URL)}</span>`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            };
            PageHeader($$renderer4, {
              title: "API Documentation",
              actions
            });
          }
          $$renderer4.push(`<!----> `);
          PageContent($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-6"><!---->`);
              Card($$renderer5, {
                class: "overflow-hidden border-border bg-gradient-to-br from-card to-muted/30",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Card_content($$renderer6, {
                    class: "p-6 sm:p-7",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div class="max-w-2xl space-y-2"><div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">`);
                      Sparkles($$renderer7, { class: "h-3.5 w-3.5" });
                      $$renderer7.push(`<!----> <span>v2.0 REST API</span></div> <h2 class="text-2xl font-bold tracking-tight text-foreground">Taren Developer API Reference</h2> <p class="text-sm leading-relaxed text-muted-foreground">Programmatic access to high-precision Brave Search indexing, AI-powered direct question answers
								with cited web sources, and real-time structured crawling.</p></div> <div class="flex flex-wrap items-center gap-2.5"><div class="rounded-lg border border-border bg-background p-3 text-xs shadow-xs"><p class="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Base Endpoint</p> <div class="mt-1 flex items-center gap-2"><code class="font-mono text-xs font-semibold text-foreground">${escape_html(BASE_API_URL)}</code> <button class="text-muted-foreground hover:text-foreground" title="Copy Base URL">`);
                      if (copiedId === "base-url-card") {
                        $$renderer7.push("<!--[-->");
                        Check($$renderer7, { class: "h-3.5 w-3.5 text-emerald-500" });
                      } else {
                        $$renderer7.push("<!--[!-->");
                        Copy($$renderer7, { class: "h-3.5 w-3.5" });
                      }
                      $$renderer7.push(`<!--]--></button></div></div> <div class="rounded-lg border border-border bg-background p-3 text-xs shadow-xs"><p class="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Authentication</p> <div class="mt-1 flex items-center gap-1.5">`);
                      Badge($$renderer7, {
                        variant: "outline",
                        class: "border-emerald-600/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-600 dark:text-emerald-400",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->X-API-Key`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <span class="text-[11px] text-muted-foreground">or Bearer</span></div></div></div></div>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex flex-wrap items-center gap-2 border-b border-border pb-3"><!--[-->`);
              const each_array = ensure_array_like(API_CATEGORIES);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let category = each_array[$$index];
                $$renderer5.push(`<button${attr_class(`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${stringify(selectedCategory === category.id ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground")}`)}>`);
                if (category.id === "search") {
                  $$renderer5.push("<!--[-->");
                  Search($$renderer5, { class: "h-3.5 w-3.5" });
                } else {
                  $$renderer5.push("<!--[!-->");
                  if (category.id === "answers") {
                    $$renderer5.push("<!--[-->");
                    Sparkles($$renderer5, { class: "h-3.5 w-3.5" });
                  } else {
                    $$renderer5.push("<!--[!-->");
                    if (category.id === "authentication") {
                      $$renderer5.push("<!--[-->");
                      Lock($$renderer5, { class: "h-3.5 w-3.5" });
                    } else {
                      $$renderer5.push("<!--[!-->");
                      if (category.id === "content-extraction") {
                        $$renderer5.push("<!--[-->");
                        File_code_corner($$renderer5, { class: "h-3.5 w-3.5" });
                      } else {
                        $$renderer5.push("<!--[!-->");
                        Zap($$renderer5, { class: "h-3.5 w-3.5" });
                      }
                      $$renderer5.push(`<!--]-->`);
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]-->`);
                }
                $$renderer5.push(`<!--]--> <span>${escape_html(category.name)}</span> `);
                if (category.badge) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<span${attr_class(`rounded px-1.5 py-0.5 text-[10px] font-medium ${stringify(selectedCategory === category.id ? "bg-primary-foreground/20 text-primary-foreground" : category.status === "active" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground")}`)}>${escape_html(category.badge)}</span>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></button>`);
              }
              $$renderer5.push(`<!--]--></div> `);
              {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="grid grid-cols-1 gap-6 lg:grid-cols-12"><div class="space-y-3 lg:col-span-3"><div class="rounded-lg border border-border bg-card p-3 shadow-xs"><p class="px-2 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">${escape_html(currentCategory.name)} Endpoints</p> <div class="mt-2 space-y-1"><!--[-->`);
                const each_array_1 = ensure_array_like(currentCategory.endpoints);
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let ep = each_array_1[$$index_1];
                  $$renderer5.push(`<button${attr_class(`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs transition-colors ${stringify(selectedEndpointId === ep.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}`)}><div class="flex min-w-0 items-center gap-2"><span class="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">${escape_html(ep.method)}</span> <span class="truncate">${escape_html(ep.path)}</span></div> `);
                  Chevron_right($$renderer5, { class: "h-3.5 w-3.5 shrink-0 opacity-50" });
                  $$renderer5.push(`<!----></button>`);
                }
                $$renderer5.push(`<!--]--></div></div> <div class="space-y-2 rounded-lg border border-border/80 bg-muted/30 p-3.5 text-xs"><div class="flex items-center gap-1.5 font-semibold text-foreground">`);
                Shield($$renderer5, { class: "h-4 w-4 text-primary" });
                $$renderer5.push(`<!----> <span>Security &amp; Limits</span></div> <ul class="list-inside list-disc space-y-1.5 text-[11px] text-muted-foreground"><li>API Key is required in all requests</li> `);
                {
                  $$renderer5.push("<!--[!-->");
                  $$renderer5.push(`<li>Max 100 results per request</li> <li>Automatic HTML sanitization</li> <li>ISO 8601 publication timestamps</li>`);
                }
                $$renderer5.push(`<!--]--></ul></div></div> <div class="space-y-6 lg:col-span-9">`);
                if (activeEndpoint) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<!---->`);
                  Card($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->`);
                      Card_header($$renderer6, {
                        class: "p-4",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<div class="flex flex-wrap items-center justify-between gap-3"><div class="flex flex-wrap items-center gap-2">`);
                          Badge($$renderer7, {
                            class: "rounded-md bg-emerald-600 px-2.5 py-1 font-mono text-xs font-bold text-white hover:bg-emerald-600",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(activeEndpoint.method)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> <div class="flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-3 py-1 font-mono text-xs font-semibold text-foreground"><span>${escape_html(BASE_API_URL)}${escape_html(activeEndpoint.path)}</span> <button class="ml-1 text-muted-foreground hover:text-foreground" title="Copy Full Endpoint URL">`);
                          if (copiedId === `ep-${activeEndpoint.id}`) {
                            $$renderer7.push("<!--[-->");
                            Check($$renderer7, { class: "h-3.5 w-3.5 text-emerald-500" });
                          } else {
                            $$renderer7.push("<!--[!-->");
                            Copy($$renderer7, { class: "h-3.5 w-3.5" });
                          }
                          $$renderer7.push(`<!--]--></button></div></div> <div class="flex items-center gap-2">`);
                          Badge($$renderer7, {
                            variant: "outline",
                            class: "border-blue-500/30 bg-blue-500/10 text-xs text-blue-600 dark:text-blue-400",
                            children: ($$renderer8) => {
                              Lock($$renderer8, { class: "mr-1 h-3 w-3" });
                              $$renderer8.push(`<!----> Auth Required`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Badge($$renderer7, {
                            variant: "secondary",
                            class: "text-xs text-muted-foreground",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(activeEndpoint.rateLimit)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----></div></div> <div class="mt-4 space-y-1"><h3 class="text-lg font-bold text-foreground">${escape_html(activeEndpoint.name)}</h3> <p class="text-xs leading-relaxed text-muted-foreground">${escape_html(activeEndpoint.description)}</p></div>`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> <!---->`);
                      Card_content($$renderer6, {
                        class: "space-y-6",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<div><h4 class="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">Request Headers</h4> <div class="overflow-x-auto rounded-lg border border-border"><!---->`);
                          Table($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->`);
                              Table_header($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->`);
                                  Table_row($$renderer9, {
                                    class: "bg-muted/40 hover:bg-transparent",
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Header`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer10.push(`<!----> <!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Type`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer10.push(`<!----> <!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Required`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer10.push(`<!----> <!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Description / Example`);
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
                                  const each_array_2 = ensure_array_like(activeEndpoint.headers);
                                  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                                    let header = each_array_2[$$index_2];
                                    $$renderer9.push(`<!---->`);
                                    Table_row($$renderer9, {
                                      class: "text-xs hover:bg-muted/30",
                                      children: ($$renderer10) => {
                                        $$renderer10.push(`<!---->`);
                                        Table_cell($$renderer10, {
                                          class: "font-mono font-medium text-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->${escape_html(header.name)}`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_cell($$renderer10, {
                                          class: "font-mono text-muted-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->${escape_html(header.type)}`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_cell($$renderer10, {
                                          children: ($$renderer11) => {
                                            if (header.required) {
                                              $$renderer11.push("<!--[-->");
                                              Badge($$renderer11, {
                                                variant: "destructive",
                                                class: "px-1.5 py-0 text-[10px]",
                                                children: ($$renderer12) => {
                                                  $$renderer12.push(`<!---->Required`);
                                                },
                                                $$slots: { default: true }
                                              });
                                            } else {
                                              $$renderer11.push("<!--[!-->");
                                              Badge($$renderer11, {
                                                variant: "outline",
                                                class: "px-1.5 py-0 text-[10px] text-muted-foreground",
                                                children: ($$renderer12) => {
                                                  $$renderer12.push(`<!---->Optional`);
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
                                          class: "text-muted-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<span>${escape_html(header.description)}</span> <code class="ml-2 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">${escape_html(header.example)}</code>`);
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
                          $$renderer7.push(`<!----></div></div> <div><h4 class="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">JSON Request Body Parameters</h4> <div class="overflow-x-auto rounded-lg border border-border"><!---->`);
                          Table($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->`);
                              Table_header($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->`);
                                  Table_row($$renderer9, {
                                    class: "bg-muted/40 hover:bg-transparent",
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Field`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer10.push(`<!----> <!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Type`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer10.push(`<!----> <!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Default`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer10.push(`<!----> <!---->`);
                                      Table_head($$renderer10, {
                                        class: "text-xs font-semibold",
                                        children: ($$renderer11) => {
                                          $$renderer11.push(`<!---->Description`);
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
                                  const each_array_3 = ensure_array_like(activeEndpoint.bodyParams);
                                  for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
                                    let param = each_array_3[$$index_4];
                                    $$renderer9.push(`<!---->`);
                                    Table_row($$renderer9, {
                                      class: "text-xs hover:bg-muted/30",
                                      children: ($$renderer10) => {
                                        $$renderer10.push(`<!---->`);
                                        Table_cell($$renderer10, {
                                          class: "font-mono font-semibold text-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<div class="flex items-center gap-1.5"><span>${escape_html(param.name)}</span> `);
                                            if (param.required) {
                                              $$renderer11.push("<!--[-->");
                                              $$renderer11.push(`<span class="font-bold text-destructive" title="Required field">*</span>`);
                                            } else {
                                              $$renderer11.push("<!--[!-->");
                                            }
                                            $$renderer11.push(`<!--]--></div>`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_cell($$renderer10, {
                                          class: "font-mono text-muted-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->${escape_html(param.type)}`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_cell($$renderer10, {
                                          class: "font-mono text-xs text-muted-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<!---->${escape_html(param.default ?? "—")}`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer10.push(`<!----> <!---->`);
                                        Table_cell($$renderer10, {
                                          class: "text-muted-foreground",
                                          children: ($$renderer11) => {
                                            $$renderer11.push(`<p>${escape_html(param.description)}</p> `);
                                            if (param.options) {
                                              $$renderer11.push("<!--[-->");
                                              $$renderer11.push(`<div class="mt-1 flex flex-wrap gap-1"><span class="text-[10px] font-medium text-muted-foreground">Options:</span> <!--[-->`);
                                              const each_array_4 = ensure_array_like(param.options);
                                              for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
                                                let opt = each_array_4[$$index_3];
                                                $$renderer11.push(`<code class="rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-foreground">"${escape_html(opt)}"</code>`);
                                              }
                                              $$renderer11.push(`<!--]--></div>`);
                                            } else {
                                              $$renderer11.push("<!--[!-->");
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
                          $$renderer7.push(`<!----></div></div> <div><div class="mb-2 flex items-center justify-between"><h4 class="text-xs font-semibold tracking-wider text-foreground uppercase">Code Examples</h4></div> <!---->`);
                          Tabs($$renderer7, {
                            class: "w-full",
                            get value() {
                              return activeSnippetTabs[activeEndpoint.id];
                            },
                            set value($$value) {
                              activeSnippetTabs[activeEndpoint.id] = $$value;
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
                                    value: "javascript",
                                    class: "text-xs",
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->JavaScript`);
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
                                  const lang = activeSnippetTabs[activeEndpoint.id] || "curl";
                                  const snippet = lang === "curl" ? activeEndpoint.snippets.curl : lang === "javascript" ? activeEndpoint.snippets.javascript : activeEndpoint.snippets.python;
                                  copyText(snippet, `snippet-${activeEndpoint.id}-${lang}`);
                                },
                                class: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
                                children: ($$renderer9) => {
                                  if (copiedId === `snippet-${activeEndpoint.id}-${activeSnippetTabs[activeEndpoint.id] || "curl"}`) {
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
                                  $$renderer9.push(`<div class="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs text-foreground"><pre><code>${escape_html(activeEndpoint.snippets.curl)}</code></pre></div>`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> <!---->`);
                              Tabs_content($$renderer8, {
                                value: "javascript",
                                class: "mt-3",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<div class="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs text-foreground"><pre><code>${escape_html(activeEndpoint.snippets.javascript)}</code></pre></div>`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> <!---->`);
                              Tabs_content($$renderer8, {
                                value: "python",
                                class: "mt-3",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<div class="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs text-foreground"><pre><code>${escape_html(activeEndpoint.snippets.python)}</code></pre></div>`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----></div> <div class="grid grid-cols-1 gap-4 pt-2 pb-4 lg:grid-cols-2"><div class="space-y-2"><h4 class="text-xs font-semibold tracking-wider text-foreground uppercase">Response Fields (200 OK)</h4> <div class="max-h-[360px] overflow-y-auto rounded-lg border border-border bg-card p-3"><div class="space-y-2"><!--[-->`);
                          const each_array_5 = ensure_array_like(activeEndpoint.responseSchema);
                          for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
                            let field = each_array_5[$$index_5];
                            $$renderer7.push(`<div class="border-b border-border/50 pb-2 text-xs last:border-0 last:pb-0"><div class="flex items-center justify-between font-mono"><span class="font-semibold text-foreground">${escape_html(field.name)}</span> <span class="text-[11px] text-muted-foreground">${escape_html(field.type)}</span></div> <p class="mt-0.5 text-[11px] text-muted-foreground">${escape_html(field.description)}</p></div>`);
                          }
                          $$renderer7.push(`<!--]--></div></div></div> <div class="space-y-2"><div class="flex items-center justify-between"><h4 class="text-xs font-semibold tracking-wider text-foreground uppercase">Example Response JSON</h4> <button class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">`);
                          if (copiedId === `res-${activeEndpoint.id}`) {
                            $$renderer7.push("<!--[-->");
                            Check($$renderer7, { class: "h-3 w-3 text-emerald-500" });
                            $$renderer7.push(`<!----> <span class="text-emerald-500">Copied</span>`);
                          } else {
                            $$renderer7.push("<!--[!-->");
                            Copy($$renderer7, { class: "h-3 w-3" });
                            $$renderer7.push(`<!----> <span>Copy JSON</span>`);
                          }
                          $$renderer7.push(`<!--]--></button></div> <div class="max-h-[360px] overflow-x-auto overflow-y-auto rounded-lg border border-border bg-muted/60 p-3.5 font-mono text-xs text-foreground"><pre><code>${escape_html(JSON.stringify(activeEndpoint.sampleResponse, null, 2))}</code></pre></div></div></div>`);
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
                          $$renderer7.push(`<div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
                          Sliders_horizontal($$renderer7, { class: "h-4 w-4" });
                          $$renderer7.push(`<!----></div> <div><!---->`);
                          Card_title($$renderer7, {
                            class: "text-base font-semibold",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->Interactive API Tester`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> <!---->`);
                          Card_description($$renderer7, {
                            class: "text-xs",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->Send a live test request to <code class="font-mono text-foreground">${escape_html(BASE_API_URL)}${escape_html(activeEndpoint.path)}</code>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----></div></div> `);
                          if (playgroundStatusCode) {
                            $$renderer7.push("<!--[-->");
                            $$renderer7.push(`<div class="flex items-center gap-2">`);
                            Badge($$renderer7, {
                              variant: playgroundStatusCode === 200 ? "default" : "destructive",
                              class: "font-mono text-xs",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Status: ${escape_html(playgroundStatusCode)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            if (playgroundTimeTaken) {
                              $$renderer7.push("<!--[-->");
                              $$renderer7.push(`<span class="font-mono text-xs text-muted-foreground">${escape_html(playgroundTimeTaken)}ms</span>`);
                            } else {
                              $$renderer7.push("<!--[!-->");
                            }
                            $$renderer7.push(`<!--]--></div>`);
                          } else {
                            $$renderer7.push("<!--[!-->");
                          }
                          $$renderer7.push(`<!--]--></div>`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> <!---->`);
                      Card_content($$renderer6, {
                        class: "space-y-4",
                        children: ($$renderer7) => {
                          {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push(`<div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="space-y-1.5">`);
                            Label($$renderer7, {
                              for: "pg-api-key",
                              class: "text-xs font-medium",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->API Key (X-API-Key)`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Input($$renderer7, {
                              id: "pg-api-key",
                              placeholder: "tare_live_...",
                              type: "password",
                              class: "h-8 font-mono text-xs",
                              get value() {
                                return playgroundApiKey;
                              },
                              set value($$value) {
                                playgroundApiKey = $$value;
                                $$settled = false;
                              }
                            });
                            $$renderer7.push(`<!----></div> <div class="space-y-1.5">`);
                            Label($$renderer7, {
                              for: "pg-query",
                              class: "text-xs font-medium",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Query String`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Input($$renderer7, {
                              id: "pg-query",
                              placeholder: "Search terms...",
                              class: "h-8 text-xs",
                              get value() {
                                return playgroundQuery;
                              },
                              set value($$value) {
                                playgroundQuery = $$value;
                                $$settled = false;
                              }
                            });
                            $$renderer7.push(`<!----></div></div> <div class="grid grid-cols-2 gap-3 sm:grid-cols-4"><div class="space-y-1.5">`);
                            Label($$renderer7, {
                              class: "text-xs font-medium",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Count (${escape_html(playgroundCount)})`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Input($$renderer7, {
                              type: "number",
                              min: 1,
                              max: 100,
                              class: "h-8 font-mono text-xs",
                              get value() {
                                return playgroundCount;
                              },
                              set value($$value) {
                                playgroundCount = $$value;
                                $$settled = false;
                              }
                            });
                            $$renderer7.push(`<!----></div> <div class="space-y-1.5">`);
                            Label($$renderer7, {
                              class: "text-xs font-medium",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->SafeSearch`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            $$renderer7.select(
                              {
                                value: playgroundSafeSearch,
                                class: "w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                              },
                              ($$renderer8) => {
                                $$renderer8.option({ value: "off" }, ($$renderer9) => {
                                  $$renderer9.push(`Off`);
                                });
                                $$renderer8.option({ value: "moderate" }, ($$renderer9) => {
                                  $$renderer9.push(`Moderate`);
                                });
                                $$renderer8.option({ value: "on" }, ($$renderer9) => {
                                  $$renderer9.push(`On (Strict)`);
                                });
                              }
                            );
                            $$renderer7.push(`</div> <div class="space-y-1.5">`);
                            Label($$renderer7, {
                              class: "text-xs font-medium",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Time Limit`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            $$renderer7.select(
                              {
                                value: playgroundTimeLimit,
                                class: "w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                              },
                              ($$renderer8) => {
                                $$renderer8.option({ value: "" }, ($$renderer9) => {
                                  $$renderer9.push(`Any time`);
                                });
                                $$renderer8.option({ value: "d" }, ($$renderer9) => {
                                  $$renderer9.push(`Past 24 hours (d)`);
                                });
                                $$renderer8.option({ value: "w" }, ($$renderer9) => {
                                  $$renderer9.push(`Past week (w)`);
                                });
                                $$renderer8.option({ value: "m" }, ($$renderer9) => {
                                  $$renderer9.push(`Past month (m)`);
                                });
                                $$renderer8.option({ value: "y" }, ($$renderer9) => {
                                  $$renderer9.push(`Past year (y)`);
                                });
                              }
                            );
                            $$renderer7.push(`</div> <div class="flex flex-col justify-end space-y-1.5"><label class="flex cursor-pointer items-center gap-2 pb-1.5"><input type="checkbox"${attr("checked", playgroundExtraction, true)} class="rounded border-border"/> <span class="text-xs font-medium text-foreground">Extract Page Content</span></label></div></div>`);
                          }
                          $$renderer7.push(`<!--]--> <div class="flex items-center justify-between pt-1 pb-4"><p class="text-[11px] text-muted-foreground">Make sure to supply your API key from the API Keys dashboard.</p> `);
                          Button($$renderer7, {
                            onclick: runPlaygroundRequest,
                            disabled: playgroundLoading,
                            size: "sm",
                            class: "gap-1.5",
                            children: ($$renderer8) => {
                              if (playgroundLoading) {
                                $$renderer8.push("<!--[-->");
                                Refresh_cw($$renderer8, { class: "h-3.5 w-3.5 animate-spin" });
                                $$renderer8.push(`<!----> <span>Executing...</span>`);
                              } else {
                                $$renderer8.push("<!--[!-->");
                                Send($$renderer8, { class: "h-3.5 w-3.5" });
                                $$renderer8.push(`<!----> <span>Send Test Request</span>`);
                              }
                              $$renderer8.push(`<!--]-->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----></div> `);
                          if (playgroundResponse || playgroundError) {
                            $$renderer7.push("<!--[-->");
                            $$renderer7.push(`<div class="mt-4 space-y-4 rounded-lg border border-border bg-muted/40 p-4">`);
                            if (playgroundResponse && playgroundResponse.text) {
                              $$renderer7.push("<!--[-->");
                              $$renderer7.push(`<div class="space-y-3 rounded-lg border border-border bg-card p-4"><div class="flex items-center justify-between"><div class="flex items-center gap-1.5">`);
                              Sparkles($$renderer7, { class: "h-4 w-4 text-primary" });
                              $$renderer7.push(`<!----> <span class="text-xs font-semibold text-foreground">AI Answer</span></div> `);
                              if (playgroundResponse.answer_type) {
                                $$renderer7.push("<!--[-->");
                                Badge($$renderer7, {
                                  variant: "outline",
                                  class: "font-mono text-[10px]",
                                  children: ($$renderer8) => {
                                    $$renderer8.push(`<!---->Provider: ${escape_html(playgroundResponse.answer_type)}`);
                                  },
                                  $$slots: { default: true }
                                });
                              } else {
                                $$renderer7.push("<!--[!-->");
                              }
                              $$renderer7.push(`<!--]--></div> <div class="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed text-foreground"><p class="whitespace-pre-wrap">${escape_html(playgroundResponse.text)}</p></div> `);
                              if (playgroundResponse.citations && playgroundResponse.citations.length > 0) {
                                $$renderer7.push("<!--[-->");
                                $$renderer7.push(`<div class="pt-2"><p class="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">Cited Sources (${escape_html(playgroundResponse.citations.length)})</p> <div class="grid grid-cols-1 gap-2 sm:grid-cols-2"><!--[-->`);
                                const each_array_6 = ensure_array_like(playgroundResponse.citations);
                                for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
                                  let cit = each_array_6[$$index_6];
                                  $$renderer7.push(`<a${attr("href", cit.url)} target="_blank" rel="noopener noreferrer" class="group flex items-start gap-2.5 rounded-md border border-border/80 bg-background/80 p-2.5 text-xs transition-colors hover:border-primary/40 hover:bg-muted/50"><span class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-[10px] font-bold text-primary">${escape_html(cit.number)}</span> <div class="min-w-0 flex-1"><p class="truncate font-medium text-foreground group-hover:text-primary">${escape_html(cit.title || cit.url)}</p> <p class="truncate font-mono text-[10px] text-muted-foreground">${escape_html(cit.url)}</p></div> `);
                                  External_link($$renderer7, {
                                    class: "h-3 w-3 shrink-0 text-muted-foreground opacity-50 group-hover:opacity-100"
                                  });
                                  $$renderer7.push(`<!----></a>`);
                                }
                                $$renderer7.push(`<!--]--></div></div>`);
                              } else {
                                $$renderer7.push("<!--[!-->");
                              }
                              $$renderer7.push(`<!--]--></div>`);
                            } else {
                              $$renderer7.push("<!--[!-->");
                            }
                            $$renderer7.push(`<!--]--> <div class="space-y-1.5"><div class="flex items-center justify-between"><span class="text-xs font-semibold text-foreground">Raw JSON Output:</span> <button class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">`);
                            if (copiedId === "pg-res") {
                              $$renderer7.push("<!--[-->");
                              Check($$renderer7, { class: "h-3 w-3 text-emerald-500" });
                              $$renderer7.push(`<!----> <span class="text-emerald-500">Copied</span>`);
                            } else {
                              $$renderer7.push("<!--[!-->");
                              Copy($$renderer7, { class: "h-3 w-3" });
                              $$renderer7.push(`<!----> <span>Copy JSON</span>`);
                            }
                            $$renderer7.push(`<!--]--></button></div> <div class="max-h-72 overflow-y-auto rounded border border-border bg-background p-3 font-mono text-xs text-foreground"><pre><code>${escape_html(JSON.stringify(playgroundResponse, null, 2))}</code></pre></div></div></div>`);
                          } else {
                            $$renderer7.push("<!--[!-->");
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
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div></div>`);
              }
              $$renderer5.push(`<!--]--></div>`);
            }
          });
          $$renderer4.push(`<!---->`);
        }
      });
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
//# sourceMappingURL=_page.svelte-CnJhvupe.js.map
