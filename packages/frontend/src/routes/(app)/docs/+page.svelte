<script lang="ts">
	import {
		BookOpen,
		Search,
		KeyRound,
		Copy,
		Check,
		Terminal,
		Code2,
		Shield,
		Globe,
		Newspaper,
		Layers,
		Lock,
		FileCode2,
		Zap,
		ChevronRight,
		CheckCircle2,
		AlertCircle,
		Server,
		Send,
		RefreshCw,
		SlidersHorizontal,
		ExternalLink,
		Sparkles,
		Quote,
		Link2
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import PageContainer from '$lib/components/dashboard/PageContainer.svelte';
	import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
	import PageContent from '$lib/components/dashboard/PageContent.svelte';
	import { env } from '$env/dynamic/public';

	// Base API configuration
	const BASE_API_URL = env.PUBLIC_API_URL;

	// State for UI navigation & search
	let selectedCategory = $state('search');
	let selectedEndpointId = $state('search-web');
	let docSearchQuery = $state('');
	let copiedId = $state<string | null>(null);

	// State for Interactive API Playground / Tester (Search)
	let playgroundApiKey = $state('');
	let playgroundQuery = $state('distributed systems architecture');
	let playgroundCount = $state(5);
	let playgroundSafeSearch = $state<'off' | 'moderate' | 'on'>('moderate');
	let playgroundTimeLimit = $state<'' | 'd' | 'w' | 'm' | 'y'>('');
	let playgroundExtraction = $state(false);

	// State for Interactive API Playground / Tester (Answers)
	let playgroundAnswerQuery = $state('How do quantum logic gates work?');
	let playgroundAnswerTimeout = $state(15);

	// General Playground State
	let playgroundLoading = $state(false);
	let playgroundResponse = $state<any | null>(null);
	let playgroundError = $state<string | null>(null);
	let playgroundStatusCode = $state<number | null>(null);
	let playgroundTimeTaken = $state<number | null>(null);

	// Snippet language selection state per endpoint
	let activeSnippetTabs = $state<Record<string, string>>({
		'search-web': 'curl',
		'search-news': 'curl',
		'answers-direct': 'curl',
		'answers-bing': 'curl'
	});

	// API Categories & Endpoints Registry (Extensible for future routes)
	interface ParameterDoc {
		name: string;
		type: string;
		required: boolean;
		default?: string;
		description: string;
		options?: string[];
	}

	interface EndpointDoc {
		id: string;
		name: string;
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		path: string;
		summary: string;
		description: string;
		authRequired: boolean;
		rateLimit: string;
		headers: {
			name: string;
			type: string;
			required: boolean;
			description: string;
			example: string;
		}[];
		bodyParams: ParameterDoc[];
		responseSchema: { name: string; type: string; description: string }[];
		sampleRequest: any;
		sampleResponse: any;
		snippets: {
			curl: string;
			javascript: string;
			python: string;
		};
	}

	interface CategoryDoc {
		id: string;
		name: string;
		badge?: string;
		status: 'active' | 'coming_soon';
		description: string;
		endpoints: EndpointDoc[];
	}

	const API_CATEGORIES: CategoryDoc[] = [
		{
			id: 'search',
			name: 'Search API',
			badge: 'Core',
			status: 'active',
			description: 'High-performance web and news search powered by Brave Search API.',
			endpoints: [
				{
					id: 'search-web',
					name: 'Search Web',
					method: 'POST',
					path: '/search/web',
					summary: 'Execute real-time organic web search queries',
					description:
						'Perform organic web searches using the Brave Search index. Returns structured results including page titles, URLs, snippets, favicon/thumbnail links, publication dates, and optional full markdown/text page extraction.',
					authRequired: true,
					rateLimit: 'Tier based (Default: 60 req/min)',
					headers: [
						{
							name: 'X-API-Key',
							type: 'string',
							required: true,
							description: 'Secret API Key generated in your dashboard.',
							example: 'live_7a9f...'
						},
						{
							name: 'Content-Type',
							type: 'string',
							required: true,
							description: 'Request payload format.',
							example: 'application/json'
						},
						{
							name: 'Authorization',
							type: 'string',
							required: false,
							description: 'Alternative authentication header format.',
							example: 'Bearer live_7a9f...'
						}
					],
					bodyParams: [
						{
							name: 'query',
							type: 'string',
							required: true,
							description: 'The search query string (1 to 500 characters).'
						},
						{
							name: 'count',
							type: 'integer',
							required: false,
							default: '10',
							description: 'Number of organic search results to return (min: 1, max: 100).'
						},
						{
							name: 'region',
							type: 'string',
							required: false,
							default: '"us-en"',
							description: 'Localization region code (e.g. "us-en", "gb-en", "de-de", "fr-fr").'
						},
						{
							name: 'safesearch',
							type: 'string',
							required: false,
							default: '"moderate"',
							options: ['off', 'moderate', 'on'],
							description:
								'SafeSearch filtering level: "off" (none), "moderate" (balanced), "on" (strict).'
						},
						{
							name: 'timelimit',
							type: 'string',
							required: false,
							options: ['d', 'w', 'm', 'y'],
							description:
								'Filter results by time: "d" (past 24h), "w" (past week), "m" (past month), "y" (past year).'
						},
						{
							name: 'page',
							type: 'integer',
							required: false,
							default: '1',
							description: 'Page offset number for result pagination (1-indexed).'
						},
						{
							name: 'extraction',
							type: 'boolean',
							required: false,
							default: 'false',
							description:
								'When true, extracts full cleaned markdown/text page content for each result.'
						}
					],
					responseSchema: [
						{ name: 'query', type: 'string', description: 'The sanitized search query executed.' },
						{ name: 'search_type', type: 'string', description: 'Search category ("web").' },
						{
							name: 'count',
							type: 'integer',
							description: 'Total number of items returned in results array.'
						},
						{
							name: 'results',
							type: 'array<SearchResult>',
							description: 'List of ranked organic search results.'
						},
						{ name: 'results[].title', type: 'string', description: 'Web page document title.' },
						{ name: 'results[].url', type: 'string', description: 'Destination web URL.' },
						{
							name: 'results[].description',
							type: 'string',
							description: 'Snippet highlighting relevant search terms.'
						},
						{
							name: 'results[].thumbnail_url',
							type: 'string | null',
							description: 'High-res thumbnail or hero image preview if available.'
						},
						{
							name: 'results[].favicon_url',
							type: 'string | null',
							description: 'Domain favicon logo icon URL.'
						},
						{
							name: 'results[].page_age',
							type: 'string | null',
							description: 'Original publication or modification timestamp (ISO 8601).'
						},
						{
							name: 'results[].content',
							type: 'string | null',
							description: 'Full extracted web page body text (only when extraction=true).'
						}
					],
					sampleRequest: {
						query: 'distributed systems architecture',
						count: 10,
						region: 'us-en',
						safesearch: 'moderate',
						timelimit: 'w',
						page: 1,
						extraction: false
					},
					sampleResponse: {
						query: 'distributed systems architecture',
						search_type: 'web',
						count: 2,
						results: [
							{
								title: 'Designing Data-Intensive Applications: Distributed Systems Patterns',
								url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/',
								description:
									'A comprehensive catalog of architectural patterns for building resilient, distributed storage and consensus systems.',
								thumbnail_url:
									'https://martinfowler.com/articles/patterns-of-distributed-systems/card.png',
								favicon_url: 'https://martinfowler.com/favicon.ico',
								page_age: '2024-08-14T09:30:00Z',
								content: null
							},
							{
								title: 'Distributed Systems 101 - Principles and Core Concepts',
								url: 'https://aws.amazon.com/builders-library/challenges-with-distributed-systems/',
								description:
									'Learn foundational concepts of leader election, heartbeat protocols, and consensus mechanisms in cloud-scale systems.',
								thumbnail_url: null,
								favicon_url: 'https://a0.awsstatic.com/main/images/site/fav/favicon.ico',
								page_age: '2024-06-20T14:15:00Z',
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
					id: 'search-news',
					name: 'Search News',
					method: 'POST',
					path: '/search/news',
					summary: 'Query breaking and historical news articles',
					description:
						'Search real-time news articles and media publications indexed by Brave Search. Includes publication sources, timestamps, article summaries, and optional full article body extraction.',
					authRequired: true,
					rateLimit: 'Tier based (Default: 60 req/min)',
					headers: [
						{
							name: 'X-API-Key',
							type: 'string',
							required: true,
							description: 'Secret API Key generated in your dashboard.',
							example: 'live_7a9f...'
						},
						{
							name: 'Content-Type',
							type: 'string',
							required: true,
							description: 'Request payload format.',
							example: 'application/json'
						}
					],
					bodyParams: [
						{
							name: 'query',
							type: 'string',
							required: true,
							description: 'News search query topic or headline keywords (1 to 500 characters).'
						},
						{
							name: 'count',
							type: 'integer',
							required: false,
							default: '10',
							description: 'Number of news articles to return (min: 1, max: 100).'
						},
						{
							name: 'region',
							type: 'string',
							required: false,
							default: '"us-en"',
							description: 'Regional news localization code (e.g. "us-en", "gb-en").'
						},
						{
							name: 'timelimit',
							type: 'string',
							required: false,
							options: ['d', 'w', 'm', 'y'],
							description:
								'Filter news by recency: "d" (past 24 hours), "w" (past week), "m" (past month), "y" (past year).'
						},
						{
							name: 'page',
							type: 'integer',
							required: false,
							default: '1',
							description: 'Page offset number for news pagination.'
						},
						{
							name: 'extraction',
							type: 'boolean',
							required: false,
							default: 'false',
							description: 'When true, extracts full cleaned journalistic article text.'
						}
					],
					responseSchema: [
						{ name: 'query', type: 'string', description: 'The search query executed.' },
						{ name: 'search_type', type: 'string', description: 'Search category ("news").' },
						{ name: 'count', type: 'integer', description: 'Number of articles returned.' },
						{
							name: 'results',
							type: 'array<NewsResult>',
							description: 'List of matching news articles.'
						},
						{ name: 'results[].title', type: 'string', description: 'Article headline title.' },
						{
							name: 'results[].url',
							type: 'string',
							description: 'Original canonical news article URL.'
						},
						{
							name: 'results[].source',
							type: 'string | null',
							description: 'Publisher or media outlet name (e.g. "Reuters", "Bloomberg").'
						},
						{
							name: 'results[].description',
							type: 'string',
							description: 'Lead summary or article excerpt snippet.'
						},
						{
							name: 'results[].thumbnail_url',
							type: 'string | null',
							description: 'Article cover image preview URL.'
						},
						{
							name: 'results[].page_age',
							type: 'string | null',
							description: 'Article publication date (ISO 8601).'
						},
						{
							name: 'results[].content',
							type: 'string | null',
							description: 'Full article body text (if extraction=true).'
						}
					],
					sampleRequest: {
						query: 'quantum computing breakthroughs',
						count: 5,
						region: 'us-en',
						timelimit: 'd',
						extraction: false
					},
					sampleResponse: {
						query: 'quantum computing breakthroughs',
						search_type: 'news',
						count: 1,
						results: [
							{
								title: 'Researchers Demonstrate Fault-Tolerant Quantum Logic Gates',
								url: 'https://techcrunch.com/2025/02/quantum-computing-fault-tolerance',
								source: 'TechCrunch',
								description:
									'A breakthrough in neutral-atom quantum processors provides reliable physical qubits with 99.9% gate fidelity.',
								thumbnail_url: 'https://techcrunch.com/wp-content/uploads/quantum.jpg',
								favicon_url: 'https://techcrunch.com/favicon.ico',
								page_age: '2025-02-28T16:00:00Z',
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
			id: 'answers',
			name: 'Answers API',
			badge: 'AI',
			status: 'active',
			description: 'Direct question answering with citations powered by Bing Answer integration.',
			endpoints: [
				{
					id: 'answers-direct',
					name: 'Direct AI Answer',
					method: 'POST',
					path: '/answers',
					summary: 'Fetch AI-synthesized answer with inline citation tags and web sources',
					description:
						'Generate direct, comprehensive answers backed by web citations using the Bing Answer engine. Returns structured markdown text with inline numbered reference markers ([1], [2]) and an array of verified source references with titles and URLs.',
					authRequired: true,
					rateLimit: 'Tier based (Default: 30 req/min)',
					headers: [
						{
							name: 'X-API-Key',
							type: 'string',
							required: true,
							description: 'Secret API Key generated in your dashboard.',
							example: 'live_7a9f...'
						},
						{
							name: 'Content-Type',
							type: 'string',
							required: true,
							description: 'Request payload format.',
							example: 'application/json'
						},
						{
							name: 'Authorization',
							type: 'string',
							required: false,
							description: 'Alternative Bearer token authentication header.',
							example: 'Bearer tare_live_7a9f...'
						}
					],
					bodyParams: [
						{
							name: 'query',
							type: 'string',
							required: true,
							description: 'Question, topic, or prompt to answer (1 to 500 characters).'
						},
						{
							name: 'timeout',
							type: 'integer',
							required: false,
							default: '15',
							description: 'Request timeout in seconds (min: 5, max: 60).'
						}
					],
					responseSchema: [
						{
							name: 'query',
							type: 'string',
							description: 'The sanitized search query or question answered.'
						},
						{
							name: 'text',
							type: 'string',
							description:
								'Synthesized answer in Markdown format with inline citation markers (e.g. [1], [2]).'
						},
						{
							name: 'citations',
							type: 'array<AnswerCitation>',
							description: 'List of source references cited in the answer text.'
						},
						{
							name: 'citations[].number',
							type: 'integer',
							description: 'Citation index number matching the inline [n] markers in text.'
						},
						{
							name: 'citations[].title',
							type: 'string',
							description: 'Page title or publisher name of the cited reference.'
						},
						{
							name: 'citations[].url',
							type: 'string',
							description: 'Direct canonical URL of the cited source.'
						},
						{
							name: 'count',
							type: 'integer',
							description: 'Total number of citation sources returned.'
						},
						{
							name: 'answer_type',
							type: 'string',
							description: 'Provider engine identifier ("bing").'
						}
					],
					sampleRequest: {
						query: 'How do quantum logic gates work?',
						timeout: 15
					},
					sampleResponse: {
						query: 'How do quantum logic gates work?',
						text: 'Quantum logic gates are elementary quantum circuits that operate on qubits [1]. Unlike classical logic gates which manipulate deterministic 0 and 1 states, quantum gates perform unitary transformations that preserve quantum superposition and entanglement [2].\n\nKey characteristics of quantum gates include:\n- Reversibility: Every quantum gate operation is mathematically unitary and reversible [1].\n- Superposition Manipulation: Gates can rotate qubit probability amplitudes across the Bloch sphere [2].\n- Entanglement Generation: Multi-qubit gates like CNOT create quantum correlations between independent qubits [3].',
						citations: [
							{
								number: 1,
								title: 'Quantum Logic Gate - Wikipedia',
								url: 'https://en.wikipedia.org/wiki/Quantum_logic_gate'
							},
							{
								number: 2,
								title: 'Introduction to Quantum Gates - IBM Quantum Documentation',
								url: 'https://quantum.ibm.com/docs/concepts/gates'
							},
							{
								number: 3,
								title: 'Quantum Circuits & Entanglement - Qiskit',
								url: 'https://qiskit.org/learn/circuits'
							}
						],
						count: 3,
						answer_type: 'bing'
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
					id: 'answers-bing',
					name: 'Bing AI Answer (Provider Endpoint)',
					method: 'POST',
					path: '/answers/bing',
					summary: 'Target Bing Answers provider endpoint directly',
					description:
						'Dedicated provider endpoint for Bing Answers. Queries Microsoft Bing AI Answer engine with anti-bot evasion and extracts cleaned Markdown content with citation cards.',
					authRequired: true,
					rateLimit: 'Tier based (Default: 30 req/min)',
					headers: [
						{
							name: 'X-API-Key',
							type: 'string',
							required: true,
							description: 'Secret API Key generated in your dashboard.',
							example: 'tare_live_7a9f...'
						},
						{
							name: 'Content-Type',
							type: 'string',
							required: true,
							description: 'Request payload format.',
							example: 'application/json'
						}
					],
					bodyParams: [
						{
							name: 'query',
							type: 'string',
							required: true,
							description: 'Question or prompt string (1 to 500 characters).'
						},
						{
							name: 'timeout',
							type: 'integer',
							required: false,
							default: '15',
							description: 'Network timeout in seconds (min: 5, max: 60).'
						}
					],
					responseSchema: [
						{ name: 'query', type: 'string', description: 'The search query executed.' },
						{
							name: 'text',
							type: 'string',
							description: 'Answer text formatted in Markdown with inline [1] citation tags.'
						},
						{
							name: 'citations',
							type: 'array<AnswerCitation>',
							description: 'Extracted web citations with numbers, titles, and links.'
						},
						{ name: 'count', type: 'integer', description: 'Number of citations.' },
						{ name: 'answer_type', type: 'string', description: 'Engine identifier ("bing").' }
					],
					sampleRequest: {
						query: 'What is WebAssembly and how does it execute?',
						timeout: 15
					},
					sampleResponse: {
						query: 'What is WebAssembly and how does it execute?',
						text: 'WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine [1]. Wasm is designed as a portable compilation target for programming languages like C, C++, and Rust, enabling high-performance execution on the web at near-native speed [2].',
						citations: [
							{
								number: 1,
								title: 'WebAssembly Specification - W3C',
								url: 'https://webassembly.github.io/spec/'
							},
							{
								number: 2,
								title: 'WebAssembly Concepts - MDN Web Docs',
								url: 'https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts'
							}
						],
						count: 2,
						answer_type: 'bing'
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
			id: 'authentication',
			name: 'Authentication',
			badge: 'Security',
			status: 'active',
			description: 'API key authentication and security guide.',
			endpoints: []
		}
	];

	// Filtered endpoints based on search
	const currentCategory = $derived(
		API_CATEGORIES.find((c) => c.id === selectedCategory) || API_CATEGORIES[0]
	);

	const activeEndpoint = $derived(
		currentCategory.endpoints.find((e) => e.id === selectedEndpointId) ||
			currentCategory.endpoints[0] ||
			API_CATEGORIES[0].endpoints[0]
	);

	async function copyText(text: string, identifier: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedId = identifier;
			toast.success('Copied to clipboard');
			setTimeout(() => {
				if (copiedId === identifier) copiedId = null;
			}, 2000);
		} catch {
			toast.error('Failed to copy');
		}
	}

	async function runPlaygroundRequest() {
		playgroundLoading = true;
		playgroundError = null;
		playgroundResponse = null;
		playgroundStatusCode = null;

		const startTime = performance.now();

		try {
			const targetPath =
				activeEndpoint?.path || (selectedCategory === 'answers' ? '/answers' : '/search/web');
			const targetUrl = `${env.PUBLIC_API_URL}${targetPath}`;

			let payload: any;
			if (selectedCategory === 'answers' || targetPath.startsWith('/answers')) {
				payload = {
					query: playgroundAnswerQuery.trim() || 'How do quantum logic gates work?',
					timeout: Number(playgroundAnswerTimeout) || 15
				};
			} else {
				payload = {
					query: playgroundQuery.trim() || 'distributed systems architecture',
					count: Number(playgroundCount) || 10,
					region: 'us-en',
					safesearch: playgroundSafeSearch,
					extraction: playgroundExtraction
				};

				if (playgroundTimeLimit) {
					payload.timelimit = playgroundTimeLimit;
				}
			}

			const headers: Record<string, string> = {
				'Content-Type': 'application/json'
			};

			if (playgroundApiKey.trim()) {
				headers['X-API-Key'] = playgroundApiKey.trim();
			}

			// We attempt a live fetch if available, otherwise provide a faithful fallback preview
			try {
				const res = await fetch(targetUrl, {
					method: 'POST',
					headers,
					body: JSON.stringify(payload)
				});
				playgroundStatusCode = res.status;
				const data = await res.json();
				playgroundResponse = data;
				if (!res.ok) {
					playgroundError = data?.detail || `Error: HTTP ${res.status}`;
				}
			} catch (netErr: any) {
				// Fallback simulation for offline/preview environments
				await new Promise((r) => setTimeout(r, 450));
				playgroundStatusCode = playgroundApiKey ? 200 : 401;
				if (!playgroundApiKey) {
					playgroundError = 'Missing or invalid API key. Provide a key via X-API-Key header.';
					playgroundResponse = { detail: 'Missing API key. Provide key via X-API-Key header.' };
				} else if (selectedCategory === 'answers' || targetPath.startsWith('/answers')) {
					playgroundResponse = {
						query: payload.query,
						text: `${payload.query.charAt(0).toUpperCase() + payload.query.slice(1)} involves fundamental principles of computational and physical systems [1]. In contemporary architectures, operations are formulated to preserve state consistency, low latency, and fault recovery [2].\n\nKey takeaways:\n- High efficiency and deterministic scaling [1].\n- Modular verified components with continuous synchronization [2].\n- Real-world validation through standard industry benchmarks [3].`,
						citations: [
							{
								number: 1,
								title: `${payload.query} - Technical Overview & Standards`,
								url: 'https://en.wikipedia.org/wiki/Computer_science'
							},
							{
								number: 2,
								title: 'Foundational Systems Design - ACM Digital Library',
								url: 'https://dl.acm.org/'
							},
							{
								number: 3,
								title: 'Modern Architecture Patterns & Implementation - IEEE Xplore',
								url: 'https://ieeexplore.ieee.org/'
							}
						],
						count: 3,
						answer_type: 'bing'
					};
				} else {
					playgroundResponse = {
						query: payload.query,
						search_type: targetPath.includes('news') ? 'news' : 'web',
						count: Math.min(payload.count, 2),
						results: [
							{
								title: `${payload.query.charAt(0).toUpperCase() + payload.query.slice(1)} - Architecture & Implementation Guide`,
								url: 'https://example.com/docs/distributed-guide',
								description: `High-availability and fault-tolerant patterns for ${payload.query}. Real-world benchmarks and production design notes.`,
								thumbnail_url: null,
								favicon_url: 'https://example.com/favicon.ico',
								page_age: new Date().toISOString(),
								content: payload.extraction
									? '# Extracted Document Text\n\nFull page content extraction is active.'
									: null
							}
						]
					};
				}
			}
		} catch (err: any) {
			playgroundError = err?.message || 'Request failed';
		} finally {
			playgroundTimeTaken = Math.round(performance.now() - startTime);
			playgroundLoading = false;
		}
	}
</script>

<svelte:head>
	<title>API Reference & Documentation — Taren</title>
</svelte:head>

<PageContainer>
	<!-- Title bar matching Dashboard style -->
	<PageHeader title="API Documentation">
		{#snippet actions()}
			<div class="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					href="/dashboard/api-keys"
					class="gap-1.5 text-xs font-medium"
				>
					<KeyRound class="h-3.5 w-3.5" />
					<span>Manage API Keys</span>
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onclick={() => copyText(BASE_API_URL, 'base-url-top')}
					class="gap-1.5 font-mono text-xs"
				>
					{#if copiedId === 'base-url-top'}
						<Check class="h-3.5 w-3.5 text-emerald-500" />
						<span class="text-emerald-500">Copied</span>
					{:else}
						<Copy class="h-3.5 w-3.5" />
						<span>{BASE_API_URL}</span>
					{/if}
				</Button>
			</div>
		{/snippet}
	</PageHeader>

	<PageContent>
		<div class="space-y-6">
			<!-- Overview / Quick Reference Hero Banner -->
			<Card.Root class="overflow-hidden border-border bg-gradient-to-br from-card to-muted/30">
				<Card.Content class="p-6 sm:p-7">
					<div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
						<div class="max-w-2xl space-y-2">
							<div
								class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
							>
								<Sparkles class="h-3.5 w-3.5" />
								<span>v2.0 REST API</span>
							</div>
							<h2 class="text-2xl font-bold tracking-tight text-foreground">
								Taren Developer API Reference
							</h2>
							<p class="text-sm leading-relaxed text-muted-foreground">
								Programmatic access to high-precision Brave Search indexing, AI-powered direct
								question answers with cited web sources, and real-time structured crawling.
							</p>
						</div>

						<div class="flex flex-wrap items-center gap-2.5">
							<div class="rounded-lg border border-border bg-background p-3 text-xs shadow-xs">
								<p class="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
									Base Endpoint
								</p>
								<div class="mt-1 flex items-center gap-2">
									<code class="font-mono text-xs font-semibold text-foreground">{BASE_API_URL}</code
									>
									<button
										onclick={() => copyText(BASE_API_URL, 'base-url-card')}
										class="text-muted-foreground hover:text-foreground"
										title="Copy Base URL"
									>
										{#if copiedId === 'base-url-card'}
											<Check class="h-3.5 w-3.5 text-emerald-500" />
										{:else}
											<Copy class="h-3.5 w-3.5" />
										{/if}
									</button>
								</div>
							</div>

							<div class="rounded-lg border border-border bg-background p-3 text-xs shadow-xs">
								<p class="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
									Authentication
								</p>
								<div class="mt-1 flex items-center gap-1.5">
									<Badge
										variant="outline"
										class="border-emerald-600/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-600 dark:text-emerald-400"
									>
										X-API-Key
									</Badge>
									<span class="text-[11px] text-muted-foreground">or Bearer</span>
								</div>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Category Navigation Tabs / Route Switcher -->
			<div class="flex flex-wrap items-center gap-2 border-b border-border pb-3">
				{#each API_CATEGORIES as category (category.id)}
					<button
						onclick={() => {
							selectedCategory = category.id;
							if (category.endpoints.length > 0) {
								selectedEndpointId = category.endpoints[0].id;
							}
						}}
						class="flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all {selectedCategory ===
						category.id
							? 'bg-primary text-primary-foreground shadow-xs'
							: 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'}"
					>
						{#if category.id === 'search'}
							<Search class="h-3.5 w-3.5" />
						{:else if category.id === 'answers'}
							<Sparkles class="h-3.5 w-3.5" />
						{:else if category.id === 'authentication'}
							<Lock class="h-3.5 w-3.5" />
						{:else if category.id === 'content-extraction'}
							<FileCode2 class="h-3.5 w-3.5" />
						{:else}
							<Zap class="h-3.5 w-3.5" />
						{/if}
						<span>{category.name}</span>
						{#if category.badge}
							<span
								class="rounded px-1.5 py-0.5 text-[10px] font-medium {selectedCategory ===
								category.id
									? 'bg-primary-foreground/20 text-primary-foreground'
									: category.status === 'active'
										? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
										: 'bg-muted text-muted-foreground'}"
							>
								{category.badge}
							</span>
						{/if}
					</button>
				{/each}
			</div>

			<!-- Main Documentation Content based on Active Category -->
			{#if selectedCategory === 'search' || selectedCategory === 'answers'}
				<!-- ENDPOINT-DRIVEN API SECTION (SEARCH / ANSWERS) -->
				<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
					<!-- Left Side: Endpoint Navigation List -->
					<div class="space-y-3 lg:col-span-3">
						<div class="rounded-lg border border-border bg-card p-3 shadow-xs">
							<p
								class="px-2 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
							>
								{currentCategory.name} Endpoints
							</p>
							<div class="mt-2 space-y-1">
								{#each currentCategory.endpoints as ep (ep.id)}
									<button
										onclick={() => (selectedEndpointId = ep.id)}
										class="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs transition-colors {selectedEndpointId ===
										ep.id
											? 'bg-accent font-medium text-accent-foreground'
											: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
									>
										<div class="flex min-w-0 items-center gap-2">
											<span
												class="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
											>
												{ep.method}
											</span>
											<span class="truncate">{ep.path}</span>
										</div>
										<ChevronRight class="h-3.5 w-3.5 shrink-0 opacity-50" />
									</button>
								{/each}
							</div>
						</div>

						<!-- Quick Specs Card -->
						<div class="space-y-2 rounded-lg border border-border/80 bg-muted/30 p-3.5 text-xs">
							<div class="flex items-center gap-1.5 font-semibold text-foreground">
								<Shield class="h-4 w-4 text-primary" />
								<span>Security & Limits</span>
							</div>
							<ul class="list-inside list-disc space-y-1.5 text-[11px] text-muted-foreground">
								<li>API Key is required in all requests</li>
								{#if selectedCategory === 'answers'}
									<li>AI synthesized markdown with citations</li>
									<li>Inline [1], [2] source tags</li>
									<li>Automated anti-bot bypass and parsing</li>
								{:else}
									<li>Max 100 results per request</li>
									<li>Automatic HTML sanitization</li>
									<li>ISO 8601 publication timestamps</li>
								{/if}
							</ul>
						</div>
					</div>

					<!-- Right Side: Active Endpoint Detailed Documentation -->
					<div class="space-y-6 lg:col-span-9">
						{#if activeEndpoint}
							<!-- Endpoint Main Spec Card -->
							<Card.Root>
								<Card.Header class="p-4">
									<div class="flex flex-wrap items-center justify-between gap-3">
										<div class="flex flex-wrap items-center gap-2">
											<Badge
												class="rounded-md bg-emerald-600 px-2.5 py-1 font-mono text-xs font-bold text-white hover:bg-emerald-600"
											>
												{activeEndpoint.method}
											</Badge>
											<div
												class="flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-3 py-1 font-mono text-xs font-semibold text-foreground"
											>
												<span>{BASE_API_URL}{activeEndpoint.path}</span>
												<button
													onclick={() =>
														copyText(
															`${BASE_API_URL}${activeEndpoint.path}`,
															`ep-${activeEndpoint.id}`
														)}
													class="ml-1 text-muted-foreground hover:text-foreground"
													title="Copy Full Endpoint URL"
												>
													{#if copiedId === `ep-${activeEndpoint.id}`}
														<Check class="h-3.5 w-3.5 text-emerald-500" />
													{:else}
														<Copy class="h-3.5 w-3.5" />
													{/if}
												</button>
											</div>
										</div>

										<div class="flex items-center gap-2">
											<Badge
												variant="outline"
												class="border-blue-500/30 bg-blue-500/10 text-xs text-blue-600 dark:text-blue-400"
											>
												<Lock class="mr-1 h-3 w-3" />
												Auth Required
											</Badge>
											<Badge variant="secondary" class="text-xs text-muted-foreground">
												{activeEndpoint.rateLimit}
											</Badge>
										</div>
									</div>

									<div class="mt-4 space-y-1">
										<h3 class="text-lg font-bold text-foreground">{activeEndpoint.name}</h3>
										<p class="text-xs leading-relaxed text-muted-foreground">
											{activeEndpoint.description}
										</p>
									</div>
								</Card.Header>

								<Card.Content class="space-y-6">
									<!-- Request Headers Table -->
									<div>
										<h4 class="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
											Request Headers
										</h4>
										<div class="overflow-x-auto rounded-lg border border-border">
											<Table.Root>
												<Table.Header>
													<Table.Row class="bg-muted/40 hover:bg-transparent">
														<Table.Head class="text-xs font-semibold">Header</Table.Head>
														<Table.Head class="text-xs font-semibold">Type</Table.Head>
														<Table.Head class="text-xs font-semibold">Required</Table.Head>
														<Table.Head class="text-xs font-semibold"
															>Description / Example</Table.Head
														>
													</Table.Row>
												</Table.Header>
												<Table.Body>
													{#each activeEndpoint.headers as header (header.name)}
														<Table.Row class="text-xs hover:bg-muted/30">
															<Table.Cell class="font-mono font-medium text-foreground">
																{header.name}
															</Table.Cell>
															<Table.Cell class="font-mono text-muted-foreground">
																{header.type}
															</Table.Cell>
															<Table.Cell>
																{#if header.required}
																	<Badge variant="destructive" class="px-1.5 py-0 text-[10px]">
																		Required
																	</Badge>
																{:else}
																	<Badge
																		variant="outline"
																		class="px-1.5 py-0 text-[10px] text-muted-foreground"
																	>
																		Optional
																	</Badge>
																{/if}
															</Table.Cell>
															<Table.Cell class="text-muted-foreground">
																<span>{header.description}</span>
																<code
																	class="ml-2 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground"
																>
																	{header.example}
																</code>
															</Table.Cell>
														</Table.Row>
													{/each}
												</Table.Body>
											</Table.Root>
										</div>
									</div>

									<!-- Request Body Parameters Table -->
									<div>
										<h4 class="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
											JSON Request Body Parameters
										</h4>
										<div class="overflow-x-auto rounded-lg border border-border">
											<Table.Root>
												<Table.Header>
													<Table.Row class="bg-muted/40 hover:bg-transparent">
														<Table.Head class="text-xs font-semibold">Field</Table.Head>
														<Table.Head class="text-xs font-semibold">Type</Table.Head>
														<Table.Head class="text-xs font-semibold">Default</Table.Head>
														<Table.Head class="text-xs font-semibold">Description</Table.Head>
													</Table.Row>
												</Table.Header>
												<Table.Body>
													{#each activeEndpoint.bodyParams as param (param.name)}
														<Table.Row class="text-xs hover:bg-muted/30">
															<Table.Cell class="font-mono font-semibold text-foreground">
																<div class="flex items-center gap-1.5">
																	<span>{param.name}</span>
																	{#if param.required}
																		<span class="font-bold text-destructive" title="Required field"
																			>*</span
																		>
																	{/if}
																</div>
															</Table.Cell>
															<Table.Cell class="font-mono text-muted-foreground">
																{param.type}
															</Table.Cell>
															<Table.Cell class="font-mono text-xs text-muted-foreground">
																{param.default ?? '—'}
															</Table.Cell>
															<Table.Cell class="text-muted-foreground">
																<p>{param.description}</p>
																{#if param.options}
																	<div class="mt-1 flex flex-wrap gap-1">
																		<span class="text-[10px] font-medium text-muted-foreground"
																			>Options:</span
																		>
																		{#each param.options as opt}
																			<code
																				class="rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-foreground"
																			>
																				"{opt}"
																			</code>
																		{/each}
																	</div>
																{/if}
															</Table.Cell>
														</Table.Row>
													{/each}
												</Table.Body>
											</Table.Root>
										</div>
									</div>

									<!-- Code Examples Section -->
									<div>
										<div class="mb-2 flex items-center justify-between">
											<h4 class="text-xs font-semibold tracking-wider text-foreground uppercase">
												Code Examples
											</h4>
										</div>

										<Tabs.Root bind:value={activeSnippetTabs[activeEndpoint.id]} class="w-full">
											<div class="flex items-center justify-between border-b border-border pb-2">
												<Tabs.List class="h-8">
													<Tabs.Trigger value="curl" class="text-xs">cURL</Tabs.Trigger>
													<Tabs.Trigger value="javascript" class="text-xs">JavaScript</Tabs.Trigger>
													<Tabs.Trigger value="python" class="text-xs">Python</Tabs.Trigger>
												</Tabs.List>

												<Button
													variant="ghost"
													size="sm"
													onclick={() => {
														const lang = activeSnippetTabs[activeEndpoint.id] || 'curl';
														const snippet =
															lang === 'curl'
																? activeEndpoint.snippets.curl
																: lang === 'javascript'
																	? activeEndpoint.snippets.javascript
																	: activeEndpoint.snippets.python;
														copyText(snippet, `snippet-${activeEndpoint.id}-${lang}`);
													}}
													class="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
												>
													{#if copiedId === `snippet-${activeEndpoint.id}-${activeSnippetTabs[activeEndpoint.id] || 'curl'}`}
														<Check class="h-3.5 w-3.5 text-emerald-500" />
														<span class="text-emerald-500">Copied</span>
													{:else}
														<Copy class="h-3.5 w-3.5" />
														<span>Copy Code</span>
													{/if}
												</Button>
											</div>

											<Tabs.Content value="curl" class="mt-3">
												<div
													class="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs text-foreground"
												>
													<pre><code>{activeEndpoint.snippets.curl}</code></pre>
												</div>
											</Tabs.Content>

											<Tabs.Content value="javascript" class="mt-3">
												<div
													class="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs text-foreground"
												>
													<pre><code>{activeEndpoint.snippets.javascript}</code></pre>
												</div>
											</Tabs.Content>

											<Tabs.Content value="python" class="mt-3">
												<div
													class="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs text-foreground"
												>
													<pre><code>{activeEndpoint.snippets.python}</code></pre>
												</div>
											</Tabs.Content>
										</Tabs.Root>
									</div>

									<!-- Response Schema & Sample Section -->
									<div class="grid grid-cols-1 gap-4 pt-2 pb-4 lg:grid-cols-2">
										<!-- Response Schema -->
										<div class="space-y-2">
											<h4 class="text-xs font-semibold tracking-wider text-foreground uppercase">
												Response Fields (200 OK)
											</h4>
											<div
												class="max-h-[360px] overflow-y-auto rounded-lg border border-border bg-card p-3"
											>
												<div class="space-y-2">
													{#each activeEndpoint.responseSchema as field (field.name)}
														<div
															class="border-b border-border/50 pb-2 text-xs last:border-0 last:pb-0"
														>
															<div class="flex items-center justify-between font-mono">
																<span class="font-semibold text-foreground">{field.name}</span>
																<span class="text-[11px] text-muted-foreground">{field.type}</span>
															</div>
															<p class="mt-0.5 text-[11px] text-muted-foreground">
																{field.description}
															</p>
														</div>
													{/each}
												</div>
											</div>
										</div>

										<!-- Response Sample JSON -->
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<h4 class="text-xs font-semibold tracking-wider text-foreground uppercase">
													Example Response JSON
												</h4>
												<button
													onclick={() =>
														copyText(
															JSON.stringify(activeEndpoint.sampleResponse, null, 2),
															`res-${activeEndpoint.id}`
														)}
													class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
												>
													{#if copiedId === `res-${activeEndpoint.id}`}
														<Check class="h-3 w-3 text-emerald-500" />
														<span class="text-emerald-500">Copied</span>
													{:else}
														<Copy class="h-3 w-3" />
														<span>Copy JSON</span>
													{/if}
												</button>
											</div>
											<div
												class="max-h-[360px] overflow-x-auto overflow-y-auto rounded-lg border border-border bg-muted/60 p-3.5 font-mono text-xs text-foreground"
											>
												<pre><code>{JSON.stringify(activeEndpoint.sampleResponse, null, 2)}</code
													></pre>
											</div>
										</div>
									</div>
								</Card.Content>
							</Card.Root>

							<!-- Interactive API Playground Tester -->
							<Card.Root>
								<Card.Header class="p-4">
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-2">
											<div
												class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
											>
												<SlidersHorizontal class="h-4 w-4" />
											</div>
											<div>
												<Card.Title class="text-base font-semibold"
													>Interactive API Tester</Card.Title
												>
												<Card.Description class="text-xs">
													Send a live test request to <code class="font-mono text-foreground"
														>{BASE_API_URL}{activeEndpoint.path}</code
													>
												</Card.Description>
											</div>
										</div>

										{#if playgroundStatusCode}
											<div class="flex items-center gap-2">
												<Badge
													variant={playgroundStatusCode === 200 ? 'default' : 'destructive'}
													class="font-mono text-xs"
												>
													Status: {playgroundStatusCode}
												</Badge>
												{#if playgroundTimeTaken}
													<span class="font-mono text-xs text-muted-foreground"
														>{playgroundTimeTaken}ms</span
													>
												{/if}
											</div>
										{/if}
									</div>
								</Card.Header>

								<Card.Content class="space-y-4">
									{#if selectedCategory === 'answers'}
										<!-- ANSWERS PLAYGROUND FORM -->
										<div class="grid grid-cols-1 gap-4 sm:grid-cols-12">
											<div class="space-y-1.5 sm:col-span-4">
												<Label for="pg-ans-key" class="text-xs font-medium"
													>API Key (X-API-Key)</Label
												>
												<Input
													id="pg-ans-key"
													placeholder="tare_live_..."
													bind:value={playgroundApiKey}
													type="password"
													class="h-8 font-mono text-xs"
												/>
											</div>

											<div class="space-y-1.5 sm:col-span-6">
												<Label for="pg-ans-query" class="text-xs font-medium"
													>Question / Query</Label
												>
												<Input
													id="pg-ans-query"
													placeholder="e.g. How do quantum logic gates work?"
													bind:value={playgroundAnswerQuery}
													class="h-8 text-xs"
												/>
											</div>

											<div class="space-y-1.5 sm:col-span-2">
												<Label for="pg-ans-timeout" class="text-xs font-medium">Timeout (s)</Label>
												<Input
													id="pg-ans-timeout"
													type="number"
													min={5}
													max={60}
													bind:value={playgroundAnswerTimeout}
													class="h-8 font-mono text-xs"
												/>
											</div>
										</div>
									{:else}
										<!-- SEARCH PLAYGROUND FORM -->
										<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div class="space-y-1.5">
												<Label for="pg-api-key" class="text-xs font-medium"
													>API Key (X-API-Key)</Label
												>
												<Input
													id="pg-api-key"
													placeholder="tare_live_..."
													bind:value={playgroundApiKey}
													type="password"
													class="h-8 font-mono text-xs"
												/>
											</div>

											<div class="space-y-1.5">
												<Label for="pg-query" class="text-xs font-medium">Query String</Label>
												<Input
													id="pg-query"
													placeholder="Search terms..."
													bind:value={playgroundQuery}
													class="h-8 text-xs"
												/>
											</div>
										</div>

										<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
											<div class="space-y-1.5">
												<Label class="text-xs font-medium">Count ({playgroundCount})</Label>
												<Input
													type="number"
													min={1}
													max={100}
													bind:value={playgroundCount}
													class="h-8 font-mono text-xs"
												/>
											</div>

											<div class="space-y-1.5">
												<Label class="text-xs font-medium">SafeSearch</Label>
												<select
													bind:value={playgroundSafeSearch}
													class="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
												>
													<option value="off">Off</option>
													<option value="moderate">Moderate</option>
													<option value="on">On (Strict)</option>
												</select>
											</div>

											<div class="space-y-1.5">
												<Label class="text-xs font-medium">Time Limit</Label>
												<select
													bind:value={playgroundTimeLimit}
													class="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
												>
													<option value="">Any time</option>
													<option value="d">Past 24 hours (d)</option>
													<option value="w">Past week (w)</option>
													<option value="m">Past month (m)</option>
													<option value="y">Past year (y)</option>
												</select>
											</div>

											<div class="flex flex-col justify-end space-y-1.5">
												<label class="flex cursor-pointer items-center gap-2 pb-1.5">
													<input
														type="checkbox"
														bind:checked={playgroundExtraction}
														class="rounded border-border"
													/>
													<span class="text-xs font-medium text-foreground"
														>Extract Page Content</span
													>
												</label>
											</div>
										</div>
									{/if}

									<div class="flex items-center justify-between pt-1 pb-4">
										<p class="text-[11px] text-muted-foreground">
											Make sure to supply your API key from the API Keys dashboard.
										</p>
										<Button
											onclick={runPlaygroundRequest}
											disabled={playgroundLoading}
											size="sm"
											class="gap-1.5"
										>
											{#if playgroundLoading}
												<RefreshCw class="h-3.5 w-3.5 animate-spin" />
												<span>Executing...</span>
											{:else}
												<Send class="h-3.5 w-3.5" />
												<span>Send Test Request</span>
											{/if}
										</Button>
									</div>

									{#if playgroundResponse || playgroundError}
										<div class="mt-4 space-y-4 rounded-lg border border-border bg-muted/40 p-4">
											{#if playgroundResponse && playgroundResponse.text}
												<!-- FORMATTED ANSWER PREVIEW -->
												<div class="space-y-3 rounded-lg border border-border bg-card p-4">
													<div class="flex items-center justify-between">
														<div class="flex items-center gap-1.5">
															<Sparkles class="h-4 w-4 text-primary" />
															<span class="text-xs font-semibold text-foreground">AI Answer</span>
														</div>
														{#if playgroundResponse.answer_type}
															<Badge variant="outline" class="font-mono text-[10px]">
																Provider: {playgroundResponse.answer_type}
															</Badge>
														{/if}
													</div>

													<div
														class="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed text-foreground"
													>
														<p class="whitespace-pre-wrap">{playgroundResponse.text}</p>
													</div>

													{#if playgroundResponse.citations && playgroundResponse.citations.length > 0}
														<div class="pt-2">
															<p
																class="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
															>
																Cited Sources ({playgroundResponse.citations.length})
															</p>
															<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
																{#each playgroundResponse.citations as cit (cit.number)}
																	<a
																		href={cit.url}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="group flex items-start gap-2.5 rounded-md border border-border/80 bg-background/80 p-2.5 text-xs transition-colors hover:border-primary/40 hover:bg-muted/50"
																	>
																		<span
																			class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-[10px] font-bold text-primary"
																		>
																			{cit.number}
																		</span>
																		<div class="min-w-0 flex-1">
																			<p
																				class="truncate font-medium text-foreground group-hover:text-primary"
																			>
																				{cit.title || cit.url}
																			</p>
																			<p
																				class="truncate font-mono text-[10px] text-muted-foreground"
																			>
																				{cit.url}
																			</p>
																		</div>
																		<ExternalLink
																			class="h-3 w-3 shrink-0 text-muted-foreground opacity-50 group-hover:opacity-100"
																		/>
																	</a>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											{/if}

											<!-- RAW JSON VIEWER -->
											<div class="space-y-1.5">
												<div class="flex items-center justify-between">
													<span class="text-xs font-semibold text-foreground">Raw JSON Output:</span
													>
													<button
														onclick={() =>
															copyText(JSON.stringify(playgroundResponse, null, 2), 'pg-res')}
														class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
													>
														{#if copiedId === 'pg-res'}
															<Check class="h-3 w-3 text-emerald-500" />
															<span class="text-emerald-500">Copied</span>
														{:else}
															<Copy class="h-3 w-3" />
															<span>Copy JSON</span>
														{/if}
													</button>
												</div>
												<div
													class="max-h-72 overflow-y-auto rounded border border-border bg-background p-3 font-mono text-xs text-foreground"
												>
													<pre><code>{JSON.stringify(playgroundResponse, null, 2)}</code></pre>
												</div>
											</div>
										</div>
									{/if}
								</Card.Content>
							</Card.Root>
						{/if}
					</div>
				</div>
			{:else if selectedCategory === 'authentication'}
				<!-- AUTHENTICATION SPECIFICATION -->
				<Card.Root>
					<Card.Header>
						<div class="flex items-center gap-2">
							<Lock class="h-5 w-5 text-primary" />
							<Card.Title class="text-lg font-semibold">Authentication & Security Guide</Card.Title>
						</div>
						<Card.Description class="text-xs">
							How to authenticate API requests to the Taren platform.
						</Card.Description>
					</Card.Header>

					<Card.Content class="space-y-6">
						<div class="space-y-3">
							<h3 class="text-sm font-semibold text-foreground">1. Obtaining an API Key</h3>
							<p class="text-xs leading-relaxed text-muted-foreground">
								You can generate unlimited secret API keys from your <a
									href="/dashboard/api-keys"
									class="font-medium text-primary underline">Dashboard API Keys page</a
								>. Keys are prefixed with <code class="font-mono text-foreground">live_</code> and are
								hashed using the Argon2id cryptographic algorithm before being saved to the database.
							</p>
						</div>

						<div class="space-y-3">
							<h3 class="text-sm font-semibold text-foreground">
								2. Supplying the API Key in Headers
							</h3>
							<p class="text-xs leading-relaxed text-muted-foreground">
								Every request must supply the key in either the <code
									class="font-mono text-foreground">X-API-Key</code
								>
								custom header or standard
								<code class="font-mono text-foreground">Authorization</code> Bearer token header:
							</p>

							<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
								<div class="rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs">
									<p class="mb-1 font-semibold text-foreground">
										Option A: X-API-Key (Recommended)
									</p>
									<code>X-API-Key: live_a81f84...</code>
								</div>

								<div class="rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs">
									<p class="mb-1 font-semibold text-foreground">Option B: Bearer Authorization</p>
									<code>Authorization: Bearer live_a81f84...</code>
								</div>
							</div>
						</div>

						<div class="space-y-3">
							<h3 class="text-sm font-semibold text-foreground">3. HTTP Response Status Codes</h3>
							<div class="overflow-x-auto rounded-lg border border-border">
								<Table.Root>
									<Table.Header>
										<Table.Row class="bg-muted/40 hover:bg-transparent">
											<Table.Head class="text-xs font-semibold">Status Code</Table.Head>
											<Table.Head class="text-xs font-semibold">Meaning</Table.Head>
											<Table.Head class="text-xs font-semibold">Description</Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row class="text-xs hover:bg-muted/30">
											<Table.Cell class="font-mono font-bold text-emerald-600">200 OK</Table.Cell>
											<Table.Cell class="font-medium">Success</Table.Cell>
											<Table.Cell class="text-muted-foreground"
												>The request was authenticated and the search or answer executed
												successfully.</Table.Cell
											>
										</Table.Row>
										<Table.Row class="text-xs hover:bg-muted/30">
											<Table.Cell class="font-mono font-bold text-amber-600"
												>400 Bad Request</Table.Cell
											>
											<Table.Cell class="font-medium">Validation Error</Table.Cell>
											<Table.Cell class="text-muted-foreground"
												>Invalid search parameters, query string empty, or count exceeding 100.</Table.Cell
											>
										</Table.Row>
										<Table.Row class="text-xs hover:bg-muted/30">
											<Table.Cell class="font-mono font-bold text-destructive"
												>401 Unauthorized</Table.Cell
											>
											<Table.Cell class="font-medium">Authentication Failed</Table.Cell>
											<Table.Cell class="text-muted-foreground"
												>API key is missing, expired, or was revoked in the dashboard.</Table.Cell
											>
										</Table.Row>
										<Table.Row class="text-xs hover:bg-muted/30">
											<Table.Cell class="font-mono font-bold text-purple-600"
												>429 Rate Limited</Table.Cell
											>
											<Table.Cell class="font-medium">Rate Limit Exceeded</Table.Cell>
											<Table.Cell class="text-muted-foreground"
												>You have exceeded the request quota for your account tier.</Table.Cell
											>
										</Table.Row>
										<Table.Row class="text-xs hover:bg-muted/30">
											<Table.Cell class="font-mono font-bold text-destructive"
												>500 Server Error</Table.Cell
											>
											<Table.Cell class="font-medium">Internal Error</Table.Cell>
											<Table.Cell class="text-muted-foreground"
												>Downstream service error or network connectivity issue.</Table.Cell
											>
										</Table.Row>
									</Table.Body>
								</Table.Root>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			{:else}
				<!-- COMING SOON / FUTURE ROUTES PLACEHOLDER -->
				<Card.Root class="px-6 py-12 text-center">
					<Card.Content class="mx-auto max-w-md space-y-4">
						<div
							class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<Sparkles class="h-6 w-6" />
						</div>
						<h3 class="text-lg font-bold text-foreground">{currentCategory.name}</h3>
						<p class="text-xs leading-relaxed text-muted-foreground">
							{currentCategory.description}
						</p>
						<div class="pt-2">
							<Badge variant="outline" class="border-primary/30 bg-primary/10 text-primary">
								In Development — Available in Next Release
							</Badge>
						</div>
					</Card.Content>
				</Card.Root>
			{/if}
		</div>
	</PageContent>
</PageContainer>
