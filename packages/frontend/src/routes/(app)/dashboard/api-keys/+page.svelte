<script lang="ts">
	import { onMount } from 'svelte';
	import {
		KeyRound,
		Plus,
		Copy,
		Check,
		Trash2,
		AlertCircle,
		AlertTriangle,
		Eye,
		EyeOff,
		ShieldCheck,
		Terminal,
		Search,
		RefreshCw,
		Sparkles,
		Code2,
		Clock,
		Shield,
		Lock,
		CheckCircle2,
		X
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { apiKeysApi, type ApiKeyResponse } from '$lib/api/api-keys.api';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Alert from '$lib/components/ui/alert';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import PageContainer from '$lib/components/dashboard/PageContainer.svelte';
	import PageHeader from '$lib/components/dashboard/PageHeader.svelte';
	import PageContent from '$lib/components/dashboard/PageContent.svelte';

	let apiKeys = $state<ApiKeyResponse[]>([]);
	let isLoadingKeys = $state(true);
	let isRefreshing = $state(false);
	let searchQuery = $state('');
	let statusFilter = $state<'all' | 'active' | 'revoked'>('all');

	// Key generation state
	let showGenerateDialog = $state(false);
	let newKeyName = $state('');
	let keyNameError = $state('');
	let isGeneratingKey = $state(false);
	let generatedKey = $state<{ key: string; name: string; id: string } | null>(null);
	let isKeyVisible = $state(false);
	let isGeneratedCopied = $state(false);

	// Key revocation state
	let keyToRevoke = $state<ApiKeyResponse | null>(null);
	let isRevoking = $state(false);

	// Clipboard tracking
	let copiedKeyId = $state<string | null>(null);
	let copiedSnippetLang = $state<string | null>(null);
	let activeCodeTab = $state('curl');

	// Derived statistics
	const activeKeysCount = $derived(apiKeys.filter((k) => k.is_active).length);
	const revokedKeysCount = $derived(apiKeys.filter((k) => !k.is_active).length);

	// Filtered keys
	const filteredKeys = $derived(
		apiKeys.filter((key) => {
			const matchesQuery =
				searchQuery.trim() === '' ||
				key.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
				key.masked_key.toLowerCase().includes(searchQuery.toLowerCase().trim());

			if (!matchesQuery) return false;

			if (statusFilter === 'active') return key.is_active;
			if (statusFilter === 'revoked') return !key.is_active;
			return true;
		})
	);

	onMount(async () => {
		await loadKeys();
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
			console.error('Failed to load API keys:', error);
			toast.error('Failed to load API keys');
		} finally {
			isLoadingKeys = false;
			isRefreshing = false;
		}
	}

	function validateKeyName() {
		keyNameError = '';
		const trimmed = newKeyName.trim();
		if (!trimmed) {
			keyNameError = 'Please enter a name for this API key';
			return false;
		}
		if (trimmed.length > 255) {
			keyNameError = 'Name must be 255 characters or less';
			return false;
		}
		return true;
	}

	function openGenerateDialog() {
		newKeyName = '';
		keyNameError = '';
		generatedKey = null;
		isKeyVisible = false;
		isGeneratedCopied = false;
		showGenerateDialog = true;
	}

	async function generateNewKey() {
		if (!validateKeyName()) return;

		isGeneratingKey = true;
		try {
			const response = await apiKeysApi.generateKey(newKeyName.trim());
			generatedKey = {
				key: response.key,
				name: response.name,
				id: response.id
			};
			isKeyVisible = false;
			isGeneratedCopied = false;
			newKeyName = '';
			keyNameError = '';

			await loadKeys(true);
			toast.success('API key generated successfully!');
		} catch (error) {
			console.error('Failed to generate API key:', error);
			toast.error('Failed to generate API key');
		} finally {
			isGeneratingKey = false;
		}
	}

	async function copyToClipboard(text: string, identifier: string, isGenerated = false) {
		if (!text) return;
		try {
			await navigator.clipboard.writeText(text);
			if (isGenerated) {
				isGeneratedCopied = true;
				setTimeout(() => {
					isGeneratedCopied = false;
				}, 2500);
			} else {
				copiedKeyId = identifier;
				setTimeout(() => {
					if (copiedKeyId === identifier) copiedKeyId = null;
				}, 2000);
			}
			toast.success('Copied to clipboard');
		} catch {
			toast.error('Failed to copy to clipboard');
		}
	}

	async function copySnippet(code: string, lang: string) {
		try {
			await navigator.clipboard.writeText(code);
			copiedSnippetLang = lang;
			toast.success('Code snippet copied');
			setTimeout(() => {
				if (copiedSnippetLang === lang) copiedSnippetLang = null;
			}, 2000);
		} catch {
			toast.error('Failed to copy code snippet');
		}
	}

	function closeGenerateDialog() {
		if (generatedKey && !isGeneratedCopied) {
			toast.info('Make sure you have saved your API key securely.');
		}
		showGenerateDialog = false;
		generatedKey = null;
		newKeyName = '';
		keyNameError = '';
		isKeyVisible = false;
		isGeneratedCopied = false;
	}

	function handleRevokeClick(key: ApiKeyResponse) {
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
			console.error('Failed to revoke API key:', error);
			toast.error('Failed to revoke API key');
		} finally {
			isRevoking = false;
		}
	}

	function formatDate(dateString: string | null) {
		if (!dateString) return 'Never';
		return new Date(dateString).toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatShortDate(dateString: string | null) {
		if (!dateString) return 'Never';
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	// Code snippet templates
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
</script>

<svelte:head>
	<title>API Keys — Taren</title>
</svelte:head>

<PageContainer>
	<PageHeader title="API Keys">
		{#snippet actions()}
			<div class="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onclick={() => loadKeys(true)}
					disabled={isLoadingKeys || isRefreshing}
					title="Refresh API Keys"
					class="gap-1.5"
				>
					<RefreshCw class="h-3.5 w-3.5 {isRefreshing ? 'animate-spin' : ''}" />
					<span class="hidden sm:inline">Refresh</span>
				</Button>
				<Button onclick={openGenerateDialog} size="sm" class="gap-1.5">
					<Plus class="h-4 w-4" />
					<span>Create API Key</span>
				</Button>
			</div>
		{/snippet}
	</PageHeader>

	<PageContent>
		<div class="space-y-6">
			<!-- Overview Stats Row -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<!-- Active Keys Card -->
				<Card.Root class="p-5">
					<div class="mb-3 flex items-center justify-between">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
						>
							<KeyRound class="h-5 w-5" />
						</div>
						<Badge
							variant="outline"
							class="border-emerald-600/30 bg-emerald-500/10 font-medium text-emerald-600 dark:text-emerald-400"
						>
							<span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
							Active
						</Badge>
					</div>
					<p class="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
						Active Keys
					</p>
					{#if isLoadingKeys}
						<Skeleton class="h-8 w-16" />
					{:else}
						<p class="text-2xl font-bold tracking-tight">{activeKeysCount}</p>
					{/if}
				</Card.Root>

				<!-- Total Generated Card -->
				<Card.Root class="p-5">
					<div class="mb-3 flex items-center justify-between">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
						>
							<Shield class="h-5 w-5" />
						</div>
						<span class="text-xs font-medium text-muted-foreground">All Time</span>
					</div>
					<p class="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
						Total Generated
					</p>
					{#if isLoadingKeys}
						<Skeleton class="h-8 w-16" />
					{:else}
						<p class="text-2xl font-bold tracking-tight">{apiKeys.length}</p>
					{/if}
				</Card.Root>

				<!-- Security Status Card -->
				<Card.Root class="p-5">
					<div class="mb-3 flex items-center justify-between">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400"
						>
							<Lock class="h-5 w-5" />
						</div>
						<Badge variant="secondary" class="text-xs">Argon2id</Badge>
					</div>
					<p class="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
						Authentication
					</p>
					<p class="truncate text-sm font-semibold">X-API-Key / Bearer</p>
				</Card.Root>
			</div>

			<!-- Main API Keys Table & Management -->
			<Card.Root>
				<Card.Header class="p-4">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<Card.Title class="text-base font-semibold">Your Secret Keys</Card.Title>
							<Card.Description class="mt-0.5 text-xs">
								Secret API keys used to authenticate programmatic requests to the API.
							</Card.Description>
						</div>

						<!-- Filter / Search controls -->
						<div class="flex flex-wrap items-center gap-2">
							<div class="relative w-full sm:w-60">
								<Search
									class="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
								/>
								<Input
									placeholder="Filter keys..."
									bind:value={searchQuery}
									class="h-8 pr-7 pl-8 text-xs"
								/>
								{#if searchQuery}
									<button
										onclick={() => (searchQuery = '')}
										class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										aria-label="Clear search"
									>
										<X class="h-3.5 w-3.5" />
									</button>
								{/if}
							</div>

							<div
								class="flex items-center rounded-lg border border-border bg-muted/40 p-0.5 text-xs"
							>
								<button
									onclick={() => (statusFilter = 'all')}
									class="rounded-md px-2.5 py-1 font-medium transition-colors {statusFilter ===
									'all'
										? 'bg-background text-foreground shadow-xs'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									All ({apiKeys.length})
								</button>
								<button
									onclick={() => (statusFilter = 'active')}
									class="rounded-md px-2.5 py-1 font-medium transition-colors {statusFilter ===
									'active'
										? 'bg-background text-foreground shadow-xs'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									Active ({activeKeysCount})
								</button>
								<button
									onclick={() => (statusFilter = 'revoked')}
									class="rounded-md px-2.5 py-1 font-medium transition-colors {statusFilter ===
									'revoked'
										? 'bg-background text-foreground shadow-xs'
										: 'text-muted-foreground hover:text-foreground'}"
								>
									Revoked ({revokedKeysCount})
								</button>
							</div>
						</div>
					</div>
				</Card.Header>

				<Card.Content class="p-0">
					{#if isLoadingKeys}
						<div class="space-y-2 p-6">
							{#each Array(3) as _}
								<div class="flex items-center justify-between gap-4 py-2">
									<div class="space-y-1.5">
										<Skeleton class="h-4 w-36" />
										<Skeleton class="h-3 w-24" />
									</div>
									<Skeleton class="h-6 w-32" />
									<Skeleton class="h-5 w-16" />
									<Skeleton class="h-8 w-8 rounded-md" />
								</div>
							{/each}
						</div>
					{:else if apiKeys.length === 0}
						<!-- Empty state when no keys exist at all -->
						<div class="flex flex-col items-center justify-center px-6 py-12 text-center">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
							>
								<KeyRound class="h-6 w-6" />
							</div>
							<h3 class="mt-4 text-base font-semibold">No API keys yet</h3>
							<p class="mt-1 max-w-sm text-xs text-muted-foreground">
								Generate an API key to start integrating search and data services directly into your
								applications.
							</p>
							<Button onclick={openGenerateDialog} size="sm" class="mt-5 gap-1.5">
								<Plus class="h-4 w-4" />
								Generate API Key
							</Button>
						</div>
					{:else if filteredKeys.length === 0}
						<!-- Filter returned 0 matches -->
						<div class="flex flex-col items-center justify-center px-6 py-12 text-center">
							<Search class="h-8 w-8 text-muted-foreground" />
							<h3 class="mt-3 text-sm font-semibold">No matching keys found</h3>
							<p class="mt-1 text-xs text-muted-foreground">
								No API keys match your filter "{searchQuery}".
							</p>
							<Button
								variant="outline"
								size="sm"
								onclick={() => {
									searchQuery = '';
									statusFilter = 'all';
								}}
								class="mt-4 text-xs"
							>
								Reset Filters
							</Button>
						</div>
					{:else}
						<!-- API Keys Table -->
						<div class="overflow-x-auto">
							<Table.Root>
								<Table.Header>
									<Table.Row class="hover:bg-transparent">
										<Table.Head class="w-[240px] text-xs font-semibold">Name</Table.Head>
										<Table.Head class="text-xs font-semibold">Key Token</Table.Head>
										<Table.Head class="text-xs font-semibold">Status</Table.Head>
										<Table.Head class="text-xs font-semibold">Created</Table.Head>
										<Table.Head class="text-xs font-semibold">Last Used</Table.Head>
										<Table.Head class="w-[70px] text-right text-xs font-semibold"
											>Actions</Table.Head
										>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{#each filteredKeys as key (key.id)}
										<Table.Row class="transition-colors hover:bg-muted/40">
											<!-- Name -->
											<Table.Cell class="font-medium">
												<div class="flex items-center gap-2.5">
													<div
														class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md {key.is_active
															? 'bg-primary/10 text-primary'
															: 'bg-muted text-muted-foreground'}"
													>
														<KeyRound class="h-3.5 w-3.5" />
													</div>
													<div class="min-w-0">
														<p
															class="truncate text-sm font-medium {key.is_active
																? 'text-foreground'
																: 'text-muted-foreground line-through'}"
														>
															{key.name}
														</p>
														<p class="text-[11px] text-muted-foreground">
															Added {formatShortDate(key.created_at)}
														</p>
													</div>
												</div>
											</Table.Cell>

											<!-- Masked Key with Copy Button -->
											<Table.Cell>
												<div class="flex items-center gap-1.5">
													<code
														class="rounded-md border border-border/60 bg-muted/60 px-2 py-1 font-mono text-xs font-medium tracking-wider text-foreground"
													>
														{key.masked_key}
													</code>
													<Button
														variant="ghost"
														size="icon-xs"
														onclick={() => copyToClipboard(key.masked_key, key.id)}
														title="Copy masked key identifier"
														class="text-muted-foreground hover:text-foreground"
													>
														{#if copiedKeyId === key.id}
															<Check class="h-3.5 w-3.5 text-emerald-500" />
														{:else}
															<Copy class="h-3.5 w-3.5" />
														{/if}
													</Button>
												</div>
											</Table.Cell>

											<!-- Status -->
											<Table.Cell>
												{#if key.is_active}
													<Badge
														variant="outline"
														class="border-emerald-600/30 bg-emerald-500/10 text-[11px] text-emerald-600 dark:text-emerald-400"
													>
														<span class="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
														></span>
														Active
													</Badge>
												{:else}
													<Badge variant="secondary" class="text-[11px] text-muted-foreground">
														Revoked
													</Badge>
												{/if}
											</Table.Cell>

											<!-- Created At -->
											<Table.Cell class="text-xs whitespace-nowrap text-muted-foreground">
												{formatDate(key.created_at)}
											</Table.Cell>

											<!-- Last Used -->
											<Table.Cell class="text-xs whitespace-nowrap">
												{#if key.last_used_at}
													<span class="text-foreground">{formatDate(key.last_used_at)}</span>
												{:else}
													<span class="text-muted-foreground italic">Never</span>
												{/if}
											</Table.Cell>

											<!-- Actions -->
											<Table.Cell class="text-right">
												{#if key.is_active}
													<Button
														variant="ghost"
														size="icon-sm"
														onclick={() => handleRevokeClick(key)}
														class="text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
														title="Revoke API key"
													>
														<Trash2 class="h-4 w-4" />
													</Button>
												{:else}
													<span class="text-xs text-muted-foreground select-none">—</span>
												{/if}
											</Table.Cell>
										</Table.Row>
									{/each}
								</Table.Body>
							</Table.Root>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- Quickstart & Integration Documentation Section -->
			<Card.Root>
				<Card.Header class="p-4">
					<div class="flex items-center gap-2">
						<Code2 class="h-5 w-5 text-primary" />
						<Card.Title class="text-base font-semibold">Quickstart & API Integration</Card.Title>
					</div>
					<Card.Description class="text-xs">
						Authenticate your requests by supplying your secret key in the <code
							class="font-mono font-semibold text-foreground">X-API-Key</code
						> request header.
					</Card.Description>
				</Card.Header>

				<Card.Content class="space-y-4">
					<!-- Authentication Header Info -->
					<div
						class="flex flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-muted/30 p-3 text-xs"
					>
						<span class="font-semibold text-foreground">Header format:</span>
						<code
							class="rounded border border-border bg-background px-2 py-0.5 font-mono font-medium text-primary"
						>
							X-API-Key: live_...
						</code>
						<span class="text-muted-foreground">or</span>
						<code
							class="rounded border border-border bg-background px-2 py-0.5 font-mono font-medium text-primary"
						>
							Authorization: Bearer live_...
						</code>
					</div>

					<!-- Code Examples Tabs -->
					<Tabs.Root bind:value={activeCodeTab} class="w-full">
						<div class="flex items-center justify-between border-b border-border pb-2">
							<Tabs.List class="h-8">
								<Tabs.Trigger value="curl" class="text-xs">cURL</Tabs.Trigger>
								<Tabs.Trigger value="js" class="text-xs">JavaScript / TS</Tabs.Trigger>
								<Tabs.Trigger value="python" class="text-xs">Python</Tabs.Trigger>
							</Tabs.List>

							<Button
								variant="ghost"
								size="sm"
								onclick={() => {
									const snippet =
										activeCodeTab === 'curl'
											? sampleCurl
											: activeCodeTab === 'js'
												? sampleJs
												: samplePython;
									copySnippet(snippet, activeCodeTab);
								}}
								class="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
							>
								{#if copiedSnippetLang === activeCodeTab}
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
								class="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground"
							>
								<pre class="leading-relaxed"><code>{sampleCurl}</code></pre>
							</div>
						</Tabs.Content>

						<Tabs.Content value="js" class="mt-3">
							<div
								class="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground"
							>
								<pre class="leading-relaxed"><code>{sampleJs}</code></pre>
							</div>
						</Tabs.Content>

						<Tabs.Content value="python" class="mt-3">
							<div
								class="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground"
							>
								<pre class="leading-relaxed"><code>{samplePython}</code></pre>
							</div>
						</Tabs.Content>
					</Tabs.Root>

					<!-- Best practices grid -->
					<div class="grid grid-cols-1 gap-3 pt-2 pb-4 sm:grid-cols-3">
						<div class="rounded-lg border border-border/50 bg-background/50 p-3">
							<div class="flex items-center gap-1.5 text-xs font-semibold">
								<ShieldCheck class="h-4 w-4 text-emerald-500" />
								<span>Keep Secrets Safe</span>
							</div>
							<p class="mt-1 text-[11px] leading-normal text-muted-foreground">
								Never commit API keys to GitHub or expose them in client-side frontends.
							</p>
						</div>

						<div class="rounded-lg border border-border/50 bg-background/50 p-3">
							<div class="flex items-center gap-1.5 text-xs font-semibold">
								<Terminal class="h-4 w-4 text-blue-500" />
								<span>Use Env Variables</span>
							</div>
							<p class="mt-1 text-[11px] leading-normal text-muted-foreground">
								Store keys inside server environment variables such as <code class="font-mono"
									>.env.local</code
								>.
							</p>
						</div>

						<div class="rounded-lg border border-border/50 bg-background/50 p-3">
							<div class="flex items-center gap-1.5 text-xs font-semibold">
								<RefreshCw class="h-4 w-4 text-amber-500" />
								<span>Rotate on Breach</span>
							</div>
							<p class="mt-1 text-[11px] leading-normal text-muted-foreground">
								If you suspect an API key was compromised, revoke it immediately and create a new
								one.
							</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</PageContent>
</PageContainer>

<!-- Generate Key Modal -->
<Dialog.Root bind:open={showGenerateDialog} onOpenChange={(open) => !open && closeGenerateDialog()}>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<KeyRound class="h-4 w-4" />
				</div>
				<div>
					<Dialog.Title class="text-base font-semibold">
						{generatedKey ? 'API Key Generated' : 'Create New API Key'}
					</Dialog.Title>
					<Dialog.Description class="text-xs">
						{#if generatedKey}
							Store your API key in a secure location.
						{:else}
							Give your API key a descriptive name to identify its usage.
						{/if}
					</Dialog.Description>
				</div>
			</div>
		</Dialog.Header>

		{#if !generatedKey}
			<!-- Generation Form -->
			<form
				onsubmit={(e) => {
					e.preventDefault();
					generateNewKey();
				}}
				class="space-y-4 pt-1"
			>
				<div class="space-y-2">
					<Label for="key-name" class="text-xs font-medium">Key Name</Label>
					<Input
						id="key-name"
						placeholder="e.g. Production Backend, CI Pipeline, Local CLI"
						bind:value={newKeyName}
						maxlength={255}
						disabled={isGeneratingKey}
						oninput={() => (keyNameError = '')}
						class="text-sm"
						autofocus
					/>
					{#if keyNameError}
						<p class="text-xs text-destructive">{keyNameError}</p>
					{/if}
				</div>

				<div class="space-y-1.5 rounded-lg border border-border/60 bg-muted/40 p-3 text-xs">
					<p class="font-semibold text-foreground">Security information:</p>
					<ul class="list-inside list-disc space-y-1 text-muted-foreground">
						<li>Keys are encrypted using <strong>Argon2id</strong> hashing.</li>
						<li>The full key will only be displayed <strong>once</strong> upon creation.</li>
						<li>You can revoke access at any time from this dashboard.</li>
					</ul>
				</div>

				<Dialog.Footer class="pt-2">
					<Button
						variant="outline"
						size="sm"
						type="button"
						onclick={closeGenerateDialog}
						disabled={isGeneratingKey}
					>
						Cancel
					</Button>
					<Button size="sm" type="submit" disabled={isGeneratingKey} class="gap-1.5">
						{#if isGeneratingKey}
							<RefreshCw class="h-3.5 w-3.5 animate-spin" />
							<span>Generating...</span>
						{:else}
							<Sparkles class="h-3.5 w-3.5" />
							<span>Generate Key</span>
						{/if}
					</Button>
				</Dialog.Footer>
			</form>
		{:else}
			<!-- Generated Key Result View -->
			<div class="space-y-4 pt-1">
				<Alert.Root class="border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200">
					<AlertTriangle class="h-4 w-4 text-amber-600 dark:text-amber-400" />
					<Alert.Title class="text-xs font-semibold">Copy your secret key</Alert.Title>
					<Alert.Description class="text-xs">
						This is the only time your full API key will be shown. Make sure to copy and store it
						securely.
					</Alert.Description>
				</Alert.Root>

				<div class="space-y-1.5">
					<Label class="text-xs font-medium text-muted-foreground"
						>Generated Secret Key ({generatedKey.name})</Label
					>
					<div class="flex gap-1.5">
						<div class="relative flex-1">
							<Input
								type={isKeyVisible ? 'text' : 'password'}
								value={generatedKey.key}
								readonly
								class="bg-muted/50 pr-9 font-mono text-xs select-all"
							/>
							<button
								type="button"
								onclick={() => (isKeyVisible = !isKeyVisible)}
								class="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								title={isKeyVisible ? 'Hide key' : 'Show key'}
							>
								{#if isKeyVisible}
									<EyeOff class="h-4 w-4" />
								{:else}
									<Eye class="h-4 w-4" />
								{/if}
							</button>
						</div>
						<Button
							variant="outline"
							size="sm"
							onclick={() => copyToClipboard(generatedKey!.key, 'generated', true)}
							class="gap-1.5 {isGeneratedCopied
								? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
								: ''}"
						>
							{#if isGeneratedCopied}
								<Check class="h-3.5 w-3.5 text-emerald-500" />
								<span>Copied!</span>
							{:else}
								<Copy class="h-3.5 w-3.5" />
								<span>Copy</span>
							{/if}
						</Button>
					</div>
				</div>

				<div class="space-y-1.5 rounded-lg border border-border/60 bg-muted/40 p-3 text-xs">
					<p class="font-semibold text-foreground">Usage example:</p>
					<code
						class="block overflow-x-auto rounded border border-border bg-background p-2 font-mono text-[11px] text-foreground"
					>
						curl -X POST https://mareno.io/api/search/web \<br />
						&nbsp;&nbsp;-H "X-API-Key: {generatedKey.key}" \<br />
						&nbsp;&nbsp;-H "Content-Type: application/json" \<br />
						&nbsp;&nbsp;-d '&#123;"query": "python"&#125;'
					</code>
				</div>

				<Dialog.Footer class="pt-2">
					<Button onclick={closeGenerateDialog} class="w-full gap-1.5" size="sm">
						<CheckCircle2 class="h-4 w-4" />
						<span>Done (I have copied my key)</span>
					</Button>
				</Dialog.Footer>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<!-- Revoke Confirmation Dialog -->
<Dialog.Root open={!!keyToRevoke} onOpenChange={(open) => !open && (keyToRevoke = null)}>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<div class="flex items-center gap-2 text-destructive">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
					<AlertTriangle class="h-4 w-4 text-destructive" />
				</div>
				<Dialog.Title class="text-base font-semibold text-foreground">Revoke API Key</Dialog.Title>
			</div>
			<Dialog.Description class="pt-2 text-xs leading-normal text-muted-foreground">
				Are you sure you want to revoke the API key <strong class="text-foreground"
					>"{keyToRevoke?.name}"</strong
				>
				({keyToRevoke?.masked_key})?
			</Dialog.Description>
		</Dialog.Header>

		<div
			class="space-y-1 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive"
		>
			<p class="font-semibold">Warning: This action is irreversible.</p>
			<p class="text-[11px] leading-relaxed">
				Any applications, background jobs, or integrations currently using this key will immediately
				fail authentication.
			</p>
		</div>

		<Dialog.Footer class="pt-2">
			<Button
				variant="outline"
				size="sm"
				onclick={() => (keyToRevoke = null)}
				disabled={isRevoking}
			>
				Cancel
			</Button>
			<Button
				variant="destructive"
				size="sm"
				onclick={executeRevokeKey}
				disabled={isRevoking}
				class="gap-1.5"
			>
				{#if isRevoking}
					<RefreshCw class="h-3.5 w-3.5 animate-spin" />
					<span>Revoking...</span>
				{:else}
					<Trash2 class="h-3.5 w-3.5" />
					<span>Revoke Key</span>
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
