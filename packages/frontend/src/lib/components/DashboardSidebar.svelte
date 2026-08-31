<script lang="ts">
	import { page } from '$app/state';
	import {
		Zap,
		LayoutDashboard,
		KeyRound,
		BookOpen,
		Settings,
		LogOut,
		Menu,
		CreditCard
	} from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { getAuthState, logout } from '$lib/stores/auth.svelte';

	const authState = getAuthState();

	let sidebarOpen = $state(false);

	const NAV_ITEMS = [
		{ icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
		{ icon: KeyRound, label: 'API Keys', href: '/dashboard/api-keys' },
		{ icon: BookOpen, label: 'Documentation', href: '/docs' },
		{ icon: CreditCard, label: 'Billing', href: '/dashboard/subscription' },
		{ icon: Settings, label: 'Settings', href: '/dashboard/settings' }
	];

	// Active if exact match for /dashboard, prefix match for sub-routes
	function isActive(href: string): boolean {
		const p = page.url.pathname;
		if (href === '/dashboard') return p === '/dashboard';
		return p.startsWith(href);
	}

	async function handleLogout() {
		try {
			await logout();
			toast.success('Logged out successfully');
			goto('/login');
		} catch {
			toast.error('Logout failed');
		}
	}

	const initials = $derived(() => {
		const name = authState.user?.name;
		if (!name) return authState.user?.email?.[0]?.toUpperCase() ?? 'T';
		return name
			.split(' ')
			.map((n: string) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	});
</script>

<!-- Mobile backdrop -->
{#if sidebarOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-30 bg-black/50 md:hidden"
		onclick={() => (sidebarOpen = false)}
		aria-hidden="true"
	></div>
{/if}

<!-- Mobile top bar -->
<header
	class="fixed top-0 right-0 left-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 md:hidden"
>
	<button
		onclick={() => (sidebarOpen = true)}
		class="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
		aria-label="Open navigation"
	>
		<Menu class="h-5 w-5" />
	</button>
	<div class="flex items-center gap-2">
		<div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
			<Zap class="h-3.5 w-3.5 text-primary-foreground" />
		</div>
		<span class="text-base font-bold tracking-tight text-sidebar-foreground">Taren</span>
	</div>
</header>

<!-- Sidebar -->
<aside
	class={[
		'flex h-screen w-60 min-w-60 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar',
		'fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out',
		sidebarOpen ? 'translate-x-0' : '-translate-x-full',
		'md:relative md:z-auto md:translate-x-0'
	].join(' ')}
>
	<!-- Logo -->
	<div class="flex shrink-0 items-center gap-2.5 px-5 py-5">
		<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
			<Zap class="h-4 w-4 text-primary-foreground" />
		</div>
		<span class="text-lg font-bold tracking-tight text-sidebar-foreground">Taren</span>
	</div>

	<div class="h-px shrink-0 bg-sidebar-border"></div>

	<!-- Nav -->
	<nav class="flex shrink-0 flex-col gap-0.5 px-3 py-3">
		{#each NAV_ITEMS as { icon: Icon, label, href } (href)}
			<a
				{href}
				onclick={() => (sidebarOpen = false)}
				class={[
					'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
					isActive(href)
						? 'bg-sidebar-accent text-sidebar-accent-foreground'
						: 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
				].join(' ')}
			>
				<Icon class="h-4 w-4 shrink-0" />
				{label}
			</a>
		{/each}
	</nav>

	<!-- Spacer -->
	<div class="flex-1"></div>

	<div class="h-px shrink-0 bg-sidebar-border"></div>

	<!-- User row -->
	{#if authState.user}
		<div class="flex shrink-0 items-center gap-3 px-4 py-4">
			<div
				class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-xs font-bold text-primary-foreground"
			>
				{#if authState.user.avatar}
					<img src={authState.user.avatar} alt="Avatar" class="h-full w-full object-cover" />
				{:else}
					{initials()}
				{/if}
			</div>
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium text-sidebar-foreground">
					{authState.user.name ?? 'User'}
				</p>
				<p class="truncate text-xs text-muted-foreground">
					{authState.user.email ?? ''}
				</p>
			</div>
			<button
				onclick={handleLogout}
				class="shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
				title="Sign out"
			>
				<LogOut class="h-4 w-4" />
			</button>
		</div>
	{/if}
</aside>
