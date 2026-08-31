<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import { goto } from '$app/navigation';
	import {
		Search,
		Globe,
		Newspaper,
		Sparkles,
		Zap,
		KeyRound,
		Terminal,
		Code2,
		Shield,
		Copy,
		Check,
		ExternalLink,
		ArrowRight,
		CheckCircle2,
		Layers,
		Bot,
		BookOpen,
		Cpu,
		Database,
		Play,
		Quote,
		Link2
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	// Demo / Interactive Hero Preview state
	let selectedApiTab = $state<'web' | 'news' | 'answers'>('answers');
	let activeCodeLang = $state<'curl' | 'javascript' | 'python'>('curl');
	let copiedSnippetId = $state<string | null>(null);

	// Interactive Demo playground state
	let demoQuery = $state('How do quantum logic gates operate in neutral-atom processors?');
	let isDemoRunning = $state(false);
	let demoActiveCategory = $state<'web' | 'news' | 'answers'>('answers');

	const demoPresets: Record<
		'web' | 'news' | 'answers',
		{ query: string; description: string }[]
	> = {
		answers: [
			{
				query: 'How do quantum logic gates operate in neutral-atom processors?',
				description: 'AI synthesized explanation with numbered citation markers and sources'
			},
			{
				query: 'What are the trade-offs between Raft and Paxos consensus?',
				description: 'Direct comparison with verified architectural references'
			},
			{
				query: 'How does WebAssembly achieve near-native execution speed in browsers?',
				description: 'Technical deep-dive with official specification links'
			}
		],
		web: [
			{
				query: 'distributed database consistency models',
				description: 'Structured organic search with titles, snippets, favicons and page ages'
			},
			{
				query: 'agentic AI orchestration frameworks 2025',
				description: 'Real-time Brave Search results with optional full markdown extraction'
			},
			{
				query: 'high-throughput async message queues benchmarking',
				description: 'Organic technical documents with domain metadata'
			}
		],
		news: [
			{
				query: 'breakthroughs in solid state battery commercialization',
				description: 'Real-time journalistic articles with publisher source and timestamps'
			},
			{
				query: 'semiconductor advanced packaging innovations',
				description: 'Breaking tech news with thumbnail URLs and lead summaries'
			},
			{
				query: 'open weights multimodal LLM releases',
				description: 'Recent publications from top tech media outlets'
			}
		]
	};

	async function copyCode(text: string, id: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedSnippetId = id;
			toast.success('Copied to clipboard');
			setTimeout(() => {
				if (copiedSnippetId === id) copiedSnippetId = null;
			}, 2000);
		} catch {
			toast.error('Failed to copy');
		}
	}

	function selectPreset(category: 'web' | 'news' | 'answers', query: string) {
		demoActiveCategory = category;
		demoQuery = query;
	}

	const codeExamples: Record<
		'web' | 'news' | 'answers',
		{ curl: string; javascript: string; python: string }
	> = {
		web: {
			curl: `curl -X POST https://mareno.io/api/search/web \\
  -H "X-API-Key: tare_live_a8f9c4e2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "distributed systems architecture",
    "count": 10,
    "safesearch": "moderate",
    "timelimit": "w",
    "extraction": false
  }'`,
			javascript: `import fetch from 'node-fetch';

const response = await fetch('https://mareno.io/api/search/web', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.TAREN_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'distributed systems architecture',
    count: 10,
    safesearch: 'moderate',
    timelimit: 'w',
    extraction: false
  })
});

const { results } = await response.json();
console.log(results);`,
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
data = response.json()
print(data["results"])`
		},
		news: {
			curl: `curl -X POST https://mareno.io/api/search/news \\
  -H "X-API-Key: tare_live_a8f9c4e2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "quantum computing breakthroughs",
    "count": 5,
    "timelimit": "d",
    "extraction": false
  }'`,
			javascript: `import fetch from 'node-fetch';

const response = await fetch('https://mareno.io/api/search/news', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.TAREN_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'quantum computing breakthroughs',
    count: 5,
    timelimit: 'd',
    extraction: false
  })
});

const { results } = await response.json();
console.log(results);`,
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
		},
		answers: {
			curl: `curl -X POST https://mareno.io/api/answers \\
  -H "X-API-Key: tare_live_a8f9c4e2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "How do quantum logic gates work?",
    "timeout": 15
  }'`,
			javascript: `import fetch from 'node-fetch';

const response = await fetch('https://mareno.io/api/answers', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.TAREN_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'How do quantum logic gates work?',
    timeout: 15
  })
});

const { text, citations } = await response.json();
console.log("Answer:", text);
console.log("Citations:", citations);`,
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
	};
</script>

<svelte:head>
	<title>Taren — Real-Time Web Search, News & AI Answers API</title>
	<meta
		name="description"
		content="High-performance developer API for real-time organic web search, news indexing, and citation-backed direct AI answers. Perfect for LLMs, RAG pipelines, and modern applications."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
	<Navigation />

	<!-- ───── HERO SECTION ───── -->
	<section class="relative overflow-hidden px-6 pt-20 pb-20 lg:px-12 lg:pt-28 lg:pb-32">
		<!-- Background Glow Accents -->
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<div
				class="h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-primary/15 via-blue-500/10 to-indigo-500/15 blur-3xl dark:from-primary/10 dark:via-blue-500/5 dark:to-indigo-500/10"
			></div>
		</div>

		<div class="relative mx-auto max-w-5xl text-center">
			<!-- Announcement Pill -->
			<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-xs">
				<Sparkles class="h-3.5 w-3.5" />
				<span>Fast, Clean & LLM-Ready Search & Answers API</span>
			</div>

			<!-- Main Headline -->
			<h1 class="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
				Web Search, Live News & <br class="hidden sm:inline" />
				<span class="bg-gradient-to-r from-primary via-indigo-500 to-sky-500 bg-clip-text text-transparent">
					AI Answers with Citations
				</span>
			</h1>

			<!-- Subtitle -->
			<p class="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
				Power your AI agents, LLM pipelines, RAG systems, and applications with fast Brave Search indexing, real-time news retrieval, and citation-backed direct answers via developer-first REST APIs.
			</p>

			<!-- Action Buttons -->
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<button
					onclick={() => goto('/register')}
					class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/35 sm:w-auto"
				>
					<span>Get API Key Free</span>
					<ArrowRight class="h-4 w-4" />
				</button>
				<a
					href="/docs"
					class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all hover:bg-secondary sm:w-auto"
				>
					<BookOpen class="h-4 w-4 text-primary" />
					<span>Explore API Reference</span>
				</a>
				<a
					href="/pricing"
					class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/60 px-5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground sm:w-auto"
				>
					<span>View Pricing</span>
				</a>
			</div>

			<p class="mt-4 text-xs text-muted-foreground">
				Includes 14-day free trial · Instant API key generation · No credit card upfront
			</p>
		</div>

		<!-- ───── HERO CODE & PREVIEW SHOWCASE ───── -->
		<div class="relative mx-auto mt-14 max-w-5xl">
			<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-sm">
				<!-- Window Title Bar -->
				<div class="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
					<!-- API Selector Tabs -->
					<div class="flex items-center gap-1.5">
						<button
							onclick={() => (selectedApiTab = 'answers')}
							class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {selectedApiTab === 'answers'
								? 'bg-primary text-primary-foreground shadow-xs'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							<Sparkles class="h-3.5 w-3.5" />
							<span>Answers API</span>
							<span class="rounded bg-primary-foreground/20 px-1 py-0.2 text-[10px]">AI</span>
						</button>
						<button
							onclick={() => (selectedApiTab = 'web')}
							class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {selectedApiTab === 'web'
								? 'bg-primary text-primary-foreground shadow-xs'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							<Globe class="h-3.5 w-3.5" />
							<span>Web Search API</span>
						</button>
						<button
							onclick={() => (selectedApiTab = 'news')}
							class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {selectedApiTab === 'news'
								? 'bg-primary text-primary-foreground shadow-xs'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							<Newspaper class="h-3.5 w-3.5" />
							<span>News Search API</span>
						</button>
					</div>

					<!-- Language Selector Tabs -->
					<div class="mt-2 flex items-center gap-1 sm:mt-0">
						<button
							onclick={() => (activeCodeLang = 'curl')}
							class="rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors {activeCodeLang === 'curl'
								? 'bg-background text-foreground shadow-xs'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							cURL
						</button>
						<button
							onclick={() => (activeCodeLang = 'javascript')}
							class="rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors {activeCodeLang === 'javascript'
								? 'bg-background text-foreground shadow-xs'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							JavaScript
						</button>
						<button
							onclick={() => (activeCodeLang = 'python')}
							class="rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors {activeCodeLang === 'python'
								? 'bg-background text-foreground shadow-xs'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							Python
						</button>
					</div>
				</div>

				<!-- Split View: Request Code & Live JSON Response Preview -->
				<div class="grid grid-cols-1 divide-y divide-border lg:grid-cols-12 lg:divide-x lg:divide-y-0">
					<!-- Left: Code Snippet -->
					<div class="relative bg-muted/20 p-5 lg:col-span-6">
						<div class="mb-3 flex items-center justify-between">
							<span class="font-mono text-xs text-muted-foreground">Request ({activeCodeLang})</span>
							<button
								onclick={() =>
									copyCode(codeExamples[selectedApiTab][activeCodeLang], `hero-${selectedApiTab}-${activeCodeLang}`)}
								class="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
							>
								{#if copiedSnippetId === `hero-${selectedApiTab}-${activeCodeLang}`}
									<Check class="h-3 w-3 text-emerald-500" />
									<span class="text-emerald-500">Copied</span>
								{:else}
									<Copy class="h-3 w-3" />
									<span>Copy</span>
								{/if}
							</button>
						</div>
						<pre class="overflow-x-auto rounded-lg border border-border/80 bg-background/80 p-4 font-mono text-xs leading-relaxed text-foreground"><code
								>{codeExamples[selectedApiTab][activeCodeLang]}</code></pre>
					</div>

					<!-- Right: Rendered API Response Preview -->
					<div class="bg-card p-5 lg:col-span-6">
						<div class="mb-3 flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="font-mono text-xs text-muted-foreground">Response Preview</span>
								<span class="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
									200 OK
								</span>
							</div>
							<span class="font-mono text-[11px] text-muted-foreground">~140ms</span>
						</div>

						{#if selectedApiTab === 'answers'}
							<!-- Live Preview for Answers API -->
							<div class="space-y-3 rounded-lg border border-border bg-background/80 p-4">
								<div class="space-y-2 text-xs leading-relaxed text-foreground">
									<p>
										Quantum logic gates perform unitary transformations on qubits that preserve quantum superposition and entanglement <span class="rounded bg-primary/20 px-1 py-0.5 font-mono font-bold text-primary">[1]</span>.
									</p>
									<p>
										In neutral-atom architectures, multi-qubit operations utilize the Rydberg blockade mechanism to selectively execute controlled entangling operations (such as CZ and CNOT gates) with high gate fidelity <span class="rounded bg-primary/20 px-1 py-0.5 font-mono font-bold text-primary">[2]</span>.
									</p>
								</div>

								<div class="border-t border-border/60 pt-3">
									<p class="mb-2 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
										Verified Citations (3 Sources)
									</p>
									<div class="space-y-1.5">
										<a
											href="https://en.wikipedia.org/wiki/Quantum_logic_gate"
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center justify-between rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
										>
											<div class="flex items-center gap-2 truncate">
												<span class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">[1]</span>
												<span class="truncate">Quantum Logic Gate - Principles and Unitary Operators</span>
											</div>
											<ExternalLink class="h-3 w-3 shrink-0 opacity-60" />
										</a>
										<a
											href="https://quantum.ibm.com/docs/concepts/gates"
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center justify-between rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
										>
											<div class="flex items-center gap-2 truncate">
												<span class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">[2]</span>
												<span class="truncate">Neutral-Atom Rydberg Quantum Gates & Laser Addressing</span>
											</div>
											<ExternalLink class="h-3 w-3 shrink-0 opacity-60" />
										</a>
									</div>
								</div>
							</div>
						{:else if selectedApiTab === 'web'}
							<!-- Live Preview for Web Search API -->
							<div class="space-y-2 rounded-lg border border-border bg-background/80 p-3">
								<div class="rounded-md border border-border/70 bg-card p-3">
									<div class="flex items-center gap-2">
										<span class="text-xs font-semibold text-primary">martinfowler.com</span>
										<span class="text-[10px] text-muted-foreground">2 days ago</span>
									</div>
									<h4 class="mt-1 text-xs font-bold text-foreground">
										Patterns of Distributed Systems: Storage & Replication
									</h4>
									<p class="mt-1 text-[11px] leading-relaxed text-muted-foreground">
										A comprehensive architectural guide covering Paxos, Raft consensus, two-phase commits, and high-availability partitioning.
									</p>
								</div>
								<div class="rounded-md border border-border/70 bg-card p-3">
									<div class="flex items-center gap-2">
										<span class="text-xs font-semibold text-primary">aws.amazon.com</span>
										<span class="text-[10px] text-muted-foreground">1 week ago</span>
									</div>
									<h4 class="mt-1 text-xs font-bold text-foreground">
										Distributed Systems 101 - Leader Election & Heartbeats
									</h4>
									<p class="mt-1 text-[11px] leading-relaxed text-muted-foreground">
										Practical engineering guidelines for building fault-tolerant distributed services at global cloud scale.
									</p>
								</div>
							</div>
						{:else}
							<!-- Live Preview for News Search API -->
							<div class="space-y-2 rounded-lg border border-border bg-background/80 p-3">
								<div class="rounded-md border border-border/70 bg-card p-3">
									<div class="flex items-center justify-between">
										<span class="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-blue-500">
											TechCrunch
										</span>
										<span class="text-[10px] text-muted-foreground">4 hours ago</span>
									</div>
									<h4 class="mt-1.5 text-xs font-bold text-foreground">
										Fault-Tolerant Quantum Gates Demonstrated with 99.9% Fidelity
									</h4>
									<p class="mt-1 text-[11px] leading-relaxed text-muted-foreground">
										New quantum computing architecture advances neutral atom qubit error correction for commercial scale deployment.
									</p>
								</div>
								<div class="rounded-md border border-border/70 bg-card p-3">
									<div class="flex items-center justify-between">
										<span class="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-blue-500">
											Reuters
										</span>
										<span class="text-[10px] text-muted-foreground">12 hours ago</span>
									</div>
									<h4 class="mt-1.5 text-xs font-bold text-foreground">
										Global Tech Consortium Announces Standardized Quantum Interconnects
									</h4>
									<p class="mt-1 text-[11px] leading-relaxed text-muted-foreground">
										Cross-industry consortium standardizes interconnect protocols for distributed quantum computing clusters.
									</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ───── 3 CORE API SERVICES ───── -->
	<section class="border-t border-border bg-secondary/30 px-6 py-24 lg:px-12">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<p class="mb-3 text-xs font-bold tracking-widest text-primary uppercase">Unified Search & AI Platform</p>
				<h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Three powerful endpoints. Endless possibilities.
				</h2>
				<p class="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
					Everything you need to feed fresh web knowledge, breaking headlines, and direct factual answers into your products.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<!-- Card 1: Answers API -->
				<div class="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
					<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-105">
						<Sparkles class="h-7 w-7" />
					</div>
					<div class="mb-3 flex items-center justify-between">
						<span class="font-mono text-xs font-bold text-primary">POST /api/answers</span>
						<span class="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">AI Powered</span>
					</div>
					<h3 class="mb-3 text-xl font-bold text-foreground">Direct AI Answers with Citations</h3>
					<p class="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
						Receive AI-synthesized, structured answers formatted in clean Markdown with numbered reference markers (<code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground">[1], [2]</code>) and an array of verified source URLs.
					</p>
					<ul class="space-y-2.5 border-t border-border pt-4 text-xs text-muted-foreground">
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Zero hallucination citation tracking</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Full source titles, URLs, and publisher meta</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Ideal for AI assistants, Copilots & RAG</span>
						</li>
					</ul>
				</div>

				<!-- Card 2: Web Search API -->
				<div class="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
					<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20 transition-transform group-hover:scale-105">
						<Globe class="h-7 w-7" />
					</div>
					<div class="mb-3 flex items-center justify-between">
						<span class="font-mono text-xs font-bold text-blue-500">POST /api/search/web</span>
						<span class="rounded bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-500">Brave Index</span>
					</div>
					<h3 class="mb-3 text-xl font-bold text-foreground">Organic Web Search API</h3>
					<p class="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
						Execute high-speed organic web search queries powered by the independent Brave Search index. Returns clean structured JSON with page titles, descriptions, favicons, thumbnails, and timestamps.
					</p>
					<ul class="space-y-2.5 border-t border-border pt-4 text-xs text-muted-foreground">
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Up to 100 organic results per query</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Optional full Markdown/Text page extraction</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>SafeSearch & regional country targeting</span>
						</li>
					</ul>
				</div>

				<!-- Card 3: News Search API -->
				<div class="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
					<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/20 transition-transform group-hover:scale-105">
						<Newspaper class="h-7 w-7" />
					</div>
					<div class="mb-3 flex items-center justify-between">
						<span class="font-mono text-xs font-bold text-sky-500">POST /api/search/news</span>
						<span class="rounded bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-500">Real-Time</span>
					</div>
					<h3 class="mb-3 text-xl font-bold text-foreground">Real-Time News Search API</h3>
					<p class="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
						Track breaking news stories, press releases, and editorial publications in real-time. Includes publication source attribution, ISO 8601 publication timestamps, and recency filtering.
					</p>
					<ul class="space-y-2.5 border-t border-border pt-4 text-xs text-muted-foreground">
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Time recency filters (past 24h, week, month)</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Verified publisher names and lead excerpts</span>
						</li>
						<li class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-emerald-500" />
							<span>Full news article content extraction</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- ───── INTERACTIVE DEMO TESTER ───── -->
	<section class="relative overflow-hidden border-t border-border px-6 py-24 lg:px-12">
		<div class="pointer-events-none absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"></div>

		<div class="relative mx-auto max-w-5xl">
			<div class="mb-12 text-center">
				<div class="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
					<Play class="h-3.5 w-3.5" />
					<span>Interactive Live Preview</span>
				</div>
				<h2 class="mb-3 text-3xl font-bold sm:text-4xl">Test sample queries instantly</h2>
				<p class="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
					See the structured output and citations our APIs deliver in milliseconds.
				</p>
			</div>

			<div class="rounded-2xl border border-border bg-card p-6 shadow-xl lg:p-8">
				<!-- Category Selector Buttons -->
				<div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
					<div class="flex flex-wrap items-center gap-2">
						<button
							onclick={() => {
								demoActiveCategory = 'answers';
								demoQuery = demoPresets.answers[0].query;
							}}
							class="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all {demoActiveCategory === 'answers'
								? 'bg-primary text-primary-foreground shadow-xs'
								: 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							<Sparkles class="h-3.5 w-3.5" />
							<span>AI Answers API</span>
						</button>
						<button
							onclick={() => {
								demoActiveCategory = 'web';
								demoQuery = demoPresets.web[0].query;
							}}
							class="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all {demoActiveCategory === 'web'
								? 'bg-primary text-primary-foreground shadow-xs'
								: 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							<Globe class="h-3.5 w-3.5" />
							<span>Web Search API</span>
						</button>
						<button
							onclick={() => {
								demoActiveCategory = 'news';
								demoQuery = demoPresets.news[0].query;
							}}
							class="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all {demoActiveCategory === 'news'
								? 'bg-primary text-primary-foreground shadow-xs'
								: 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							<Newspaper class="h-3.5 w-3.5" />
							<span>News Search API</span>
						</button>
					</div>

					<a
						href="/docs"
						class="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
					>
						<span>Open Full Docs</span>
						<ExternalLink class="h-3.5 w-3.5" />
					</a>
				</div>

				<!-- Sample Preset Buttons -->
				<div class="mb-6">
					<p class="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
						Try sample questions / queries:
					</p>
					<div class="flex flex-wrap gap-2">
						{#each demoPresets[demoActiveCategory] as preset}
							<button
								onclick={() => (demoQuery = preset.query)}
								class="rounded-lg border border-border bg-background px-3 py-1.5 text-left text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-muted/50 {demoQuery === preset.query ? 'border-primary bg-primary/5 font-semibold text-primary' : ''}"
							>
								"{preset.query}"
							</button>
						{/each}
					</div>
				</div>

				<!-- Query Input Bar -->
				<div class="mb-6 flex flex-col gap-3 sm:flex-row">
					<div class="relative flex-1">
						<Search class="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							bind:value={demoQuery}
							placeholder="Enter any search query or question..."
							class="h-11 w-full rounded-xl border border-border bg-background pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						/>
					</div>
					<a
						href="/docs"
						class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
					>
						<Code2 class="h-4 w-4" />
						<span>Test in API Console</span>
					</a>
				</div>

				<!-- Live Result Output Card -->
				<div class="rounded-xl border border-border bg-muted/20 p-5">
					<div class="mb-3 flex items-center justify-between border-b border-border pb-3">
						<div class="flex items-center gap-2">
							<span class="font-mono text-xs font-bold text-foreground">
								{demoActiveCategory === 'answers' ? '/api/answers' : demoActiveCategory === 'web' ? '/api/search/web' : '/api/search/news'}
							</span>
							<span class="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
								200 OK
							</span>
						</div>
						<span class="font-mono text-xs text-muted-foreground">Payload size: 1.2 KB</span>
					</div>

					{#if demoActiveCategory === 'answers'}
						<div class="space-y-4">
							<div class="space-y-2 text-sm leading-relaxed text-foreground">
								<p>
									{demoQuery.endsWith('?') ? demoQuery.slice(0, -1) : demoQuery} is characterized by systematic engineering protocols designed to guarantee reproducibility and operational reliability <span class="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs font-bold text-primary">[1]</span>.
								</p>
								<p>
									Modern implementations utilize automated state reconciliation, resilient telemetry pipelines, and atomic verification across distributed nodes <span class="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs font-bold text-primary">[2]</span>.
								</p>
							</div>

							<div class="border-t border-border pt-3">
								<p class="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
									Citations & Grounded Sources (JSON)
								</p>
								<div class="space-y-2">
									<div class="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-xs">
										<div class="flex items-center gap-2.5 truncate">
											<span class="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">[1]</span>
											<span class="font-medium text-foreground truncate">Technical Architecture Standards & Specifications</span>
										</div>
										<span class="font-mono text-[11px] text-muted-foreground">https://en.wikipedia.org/wiki/Computer_science</span>
									</div>
									<div class="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-xs">
										<div class="flex items-center gap-2.5 truncate">
											<span class="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">[2]</span>
											<span class="font-medium text-foreground truncate">Distributed Architecture Benchmark Reports 2025</span>
										</div>
										<span class="font-mono text-[11px] text-muted-foreground">https://martinfowler.com/articles/patterns/</span>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<div class="space-y-3">
							<div class="rounded-lg border border-border bg-background p-4">
								<div class="flex items-center justify-between">
									<span class="text-xs font-semibold text-primary">docs.example.com</span>
									<span class="font-mono text-[11px] text-muted-foreground">2025-02-28</span>
								</div>
								<h4 class="mt-1 text-sm font-bold text-foreground">
									{demoQuery.charAt(0).toUpperCase() + demoQuery.slice(1)} — Comprehensive Reference Guide
								</h4>
								<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
									Complete developer documentation, code samples, performance benchmarks, and deployment patterns for {demoQuery}.
								</p>
							</div>

							<div class="rounded-lg border border-border bg-background p-4">
								<div class="flex items-center justify-between">
									<span class="text-xs font-semibold text-primary">techjournal.io</span>
									<span class="font-mono text-[11px] text-muted-foreground">2025-02-27</span>
								</div>
								<h4 class="mt-1 text-sm font-bold text-foreground">
									Evaluating Modern Approaches to {demoQuery}
								</h4>
								<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
									An in-depth empirical comparison analyzing throughput, resource utilization, and production trade-offs.
								</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- ───── BUILT FOR AI & DEVELOPERS ───── -->
	<section class="border-t border-border bg-secondary/20 px-6 py-24 lg:px-12">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<p class="mb-3 text-xs font-bold tracking-widest text-primary uppercase">Why Choose Taren</p>
				<h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Engineered for LLMs, RAG & Agents
				</h2>
				<p class="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
					Skip brittle scraping scripts, proxy rotations, and CAPTCHAs. Get clean, reliable web data with a single HTTP call.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<!-- Feature 1 -->
				<div class="rounded-2xl border border-border bg-card p-6 shadow-xs">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Bot class="h-5 w-5" />
					</div>
					<h3 class="mb-2 text-base font-bold text-foreground">LLM & Context-Ready</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Clean Markdown output and structured JSON without messy HTML tags, boilerplate headers, or ad clutter. Feed results directly into LLM prompts.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="rounded-2xl border border-border bg-card p-6 shadow-xs">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
						<Shield class="h-5 w-5" />
					</div>
					<h3 class="mb-2 text-base font-bold text-foreground">No IP Bans or CAPTCHAs</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						We handle all anti-bot evasion, browser emulation, TLS fingerprinting, and proxy pools so you can focus entirely on building your application.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="rounded-2xl border border-border bg-card p-6 shadow-xs">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
						<Link2 class="h-5 w-5" />
					</div>
					<h3 class="mb-2 text-base font-bold text-foreground">Grounded Web Citations</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Every AI-synthesized answer includes numbered inline citation tags that map directly to verified web URLs for complete factual provenance.
					</p>
				</div>

				<!-- Feature 4 -->
				<div class="rounded-2xl border border-border bg-card p-6 shadow-xs">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
						<Zap class="h-5 w-5" />
					</div>
					<h3 class="mb-2 text-base font-bold text-foreground">Sub-200ms Latency</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						High-throughput infrastructure optimized for real-time applications, AI agent tool calls, and streaming user interfaces.
					</p>
				</div>

				<!-- Feature 5 -->
				<div class="rounded-2xl border border-border bg-card p-6 shadow-xs">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
						<KeyRound class="h-5 w-5" />
					</div>
					<h3 class="mb-2 text-base font-bold text-foreground">Simple API Key Auth</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Authenticate seamlessly using <code class="rounded bg-muted px-1 py-0.5 text-[11px] text-foreground">X-API-Key</code> or standard Bearer tokens. Rotate keys anytime in your dashboard.
					</p>
				</div>

				<!-- Feature 6 -->
				<div class="rounded-2xl border border-border bg-card p-6 shadow-xs">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
						<Cpu class="h-5 w-5" />
					</div>
					<h3 class="mb-2 text-base font-bold text-foreground">Full Page Extraction</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Set <code class="rounded bg-muted px-1 py-0.5 text-[11px] text-foreground">"extraction": true</code> on any search query to automatically crawl and parse full web pages into markdown.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ───── HOW TO GET STARTED (3 SIMPLE STEPS) ───── -->
	<section class="border-t border-border px-6 py-24 lg:px-12">
		<div class="mx-auto max-w-5xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold sm:text-4xl">Integrate in under 3 minutes</h2>
				<p class="text-base text-muted-foreground">Simple, predictable REST endpoints that work in any language.</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<!-- Step 1 -->
				<div class="relative flex flex-col rounded-2xl border border-border bg-card p-7">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<KeyRound class="h-6 w-6" />
					</div>
					<span class="mb-2 font-mono text-xs font-bold tracking-widest text-primary uppercase">Step 1</span>
					<h3 class="mb-2 text-lg font-bold">Generate your API Key</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Create your account and instantly generate a live API key from the dashboard. No credit card required to begin testing.
					</p>
				</div>

				<!-- Step 2 -->
				<div class="relative flex flex-col rounded-2xl border border-border bg-card p-7">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Terminal class="h-6 w-6" />
					</div>
					<span class="mb-2 font-mono text-xs font-bold tracking-widest text-primary uppercase">Step 2</span>
					<h3 class="mb-2 text-lg font-bold">Send a POST Request</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Make a request to <code class="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">/search/web</code>, <code class="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">/search/news</code>, or <code class="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">/answers</code> with your query.
					</p>
				</div>

				<!-- Step 3 -->
				<div class="relative flex flex-col rounded-2xl border border-border bg-card p-7">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Sparkles class="h-6 w-6" />
					</div>
					<span class="mb-2 font-mono text-xs font-bold tracking-widest text-primary uppercase">Step 3</span>
					<h3 class="mb-2 text-lg font-bold">Consume Clean Data</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Receive structured JSON results, extracted page markdown, and citation links ready for your application or AI context window.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ───── PRICING TEASER ───── -->
	<section class="border-t border-border bg-secondary/30 px-6 py-24 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<div class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
				<Zap class="h-3.5 w-3.5" />
				<span>Transparent Developer Pricing</span>
			</div>
			<h2 class="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Start free, scale seamlessly</h2>
			<p class="mb-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
				Starter at <span class="font-bold text-foreground">$15/mo</span> with a 14-day free trial. Professional at <span class="font-bold text-foreground">$39/mo</span> with high rate limits and priority support.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 sm:w-auto"
				>
					<span>Start 14-Day Free Trial</span>
					<ArrowRight class="h-4 w-4" />
				</a>
				<a
					href="/pricing"
					class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
				>
					<span>View All Plans & Features</span>
				</a>
			</div>
		</div>
	</section>

	<!-- ───── FOOTER ───── -->
	<footer class="border-t border-border px-6 py-12 lg:px-12">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
			<div class="flex items-center gap-2">
				<span class="text-base font-bold text-foreground">Taren</span>
				<span class="text-xs text-muted-foreground">— High-Performance Web & AI Answers API</span>
			</div>
			<div class="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
				<a href="/docs" class="transition-colors hover:text-foreground">Documentation</a>
				<a href="/pricing" class="transition-colors hover:text-foreground">Pricing</a>
				<a href="/login" class="transition-colors hover:text-foreground">Sign in</a>
				<a href="/register" class="transition-colors hover:text-foreground">Get started</a>
				<a href="/privacy" class="transition-colors hover:text-foreground">Privacy Policy</a>
				<a href="/terms" class="transition-colors hover:text-foreground">Terms of Service</a>
			</div>
			<p class="text-xs text-muted-foreground">
				&copy; {new Date().getFullYear()} Taren. All rights reserved.
			</p>
		</div>
	</footer>
</div>
