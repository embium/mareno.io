<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getAuthState, logout, initializeAuth } from '$lib/stores/auth.svelte';
	import UserMenu from '$lib/components/UserMenu.svelte';

	const authState = getAuthState();
	let mobileMenuOpen = $state(false);

	onMount(async () => {
		await initializeAuth();
	});

	async function handleLogout() {
		try {
			await logout();
			toast.success('Logged out successfully');
			mobileMenuOpen = false;
		} catch (error) {
			console.error('Logout error:', error);
			toast.error('Logout failed');
		}
	}

	function navigateTo(path: string) {
		goto(path);
		mobileMenuOpen = false;
	}
</script>

<!-- Navigation Bar -->
<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="text-xl font-bold text-foreground transition-opacity hover:opacity-80"
			>Taren</a
		>

		{#if authState.isAuthenticated && authState.user}
			<UserMenu />
		{:else}
			<!-- Guest Links -->
			<nav class="flex items-center gap-1">
				<a
					href="/pricing"
					class="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
				>
					Pricing
				</a>
				<Button
					variant="ghost"
					size="sm"
					class="text-muted-foreground hover:text-foreground"
					onclick={() => navigateTo('/login')}
				>
					Sign in
				</Button>
				<Button
					size="sm"
					class="bg-foreground text-background hover:opacity-80"
					onclick={() => navigateTo('/register')}
				>
					Get started
				</Button>
			</nav>
		{/if}
	</div>
</header>
