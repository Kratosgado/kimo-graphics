<script>
	import { fade } from 'svelte/transition';
	import '../app.css';
	import { contact } from '$lib/details';
	import { page } from '$app/state';

	let { children } = $props();
	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const categories = [
		{ id: 'all', name: 'All Work' },
		{ id: 'books', name: 'Books' },
		{ id: 'flyers', name: 'Flyers' },
		{ id: 'merch', name: 'Merch' },
		{ id: 'letterheads', name: 'Letter Heads' }
	];
</script>

<div class="min-h-screen bg-red flex flex-col bg-base-100">
	<header class="sticky top-0 z-50 bg-base-100/90 backdrop-blur-sm border-b border-base-200">
		<div class="container mx-auto px-4">
			<div class="navbar py-4">
				<div class="navbar-start">
					<a href="/" class="text-xl md:text-2xl font-bold tracking-tight">
						KIMO<span class="text-primary">GRAPHICS</span>
					</a>
				</div>

				<div class="navbar-end">
					<!-- Mobile menu button -->
					<button aria-label="toggle menu" class="btn btn-ghost lg:hidden" onclick={toggleMenu}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					<!-- Desktop navigation -->
					<nav class="hidden lg:flex lg:items-center lg:space-x-8">
						<a
							href="/"
							class="font-medium hover:text-primary transition-colors {page.url.pathname === '/'
								? 'text-primary'
								: ''}"
						>
							Work
						</a>
						<a
							href="/about"
							class="font-medium hover:text-primary transition-colors {page.url.pathname ===
							'/about'
								? 'text-primary'
								: ''}"
						>
							About
						</a>
						<a
							href="/contact"
							class="font-medium hover:text-primary transition-colors {page.url.pathname ===
							'/contact'
								? 'text-primary'
								: ''}"
						>
							Contact
						</a>
						<a href="/admin" class="btn btn-primary btn-sm">Admin</a>
					</nav>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div transition:fade={{ duration: 200 }} class="lg:hidden">
				<nav class="flex flex-col space-y-4 p-4 bg-base-100 border-t border-base-200">
					<a
						href="/"
						class="font-medium py-2 hover:text-primary transition-colors {page.url.pathname === '/'
							? 'text-primary'
							: ''}"
					>
						Work
					</a>
					<a
						href="/about"
						class="font-medium py-2 hover:text-primary transition-colors {page.url.pathname ===
						'/about'
							? 'text-primary'
							: ''}"
					>
						About
					</a>
					<a
						href="/contact"
						class="font-medium py-2 hover:text-primary transition-colors {page.url.pathname ===
						'/contact'
							? 'text-primary'
							: ''}"
					>
						Contact
					</a>
					<a href="/admin" class="btn btn-primary btn-sm w-full">Admin</a>
				</nav>
			</div>
		{/if}

		<!-- Category filter (only on homepage) -->
		{#if page.url.pathname === '/'}
			<div class="container mx-auto px-4 py-2 overflow-x-auto">
				<div class="flex space-x-2">
					{#each categories as category}
						<a
							href="/?category={category.id}"
							class="btn btn-sm {page.url.searchParams.get('category') === category.id ||
							(!page.url.searchParams.get('category') && category.id === 'all')
								? 'btn-primary'
								: 'btn-ghost'}"
						>
							{category.name}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</header>

	<main class="flex-grow">
		{@render children()}
	</main>

	<footer class="bg-base-200">
		<div class="container mx-auto px-4 py-12">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h3 class="text-xl font-bold mb-4">KIMO<span class="text-primary">GRAPHICS</span></h3>
					<p class="text-base-content/70">
						Creating meaningful design solutions for brands with purpose.
					</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-4">Contact</h3>
					<p class="mb-2 text-primary">{contact.email}</p>
					<p class="text-primary">{contact.phone}</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-4">Connect</h3>
					<div class="flex space-x-4">
						<a href={contact.social.instagram} class="hover:text-primary transition-colors"
							>Instagram</a
						>
						<a href={contact.social.facebook} class="hover:text-primary transition-colors"
							>Facebook</a
						>
						<a href={contact.social.pinterest} class="hover:text-primary transition-colors"
							>Pinterest</a
						>
					</div>
				</div>
			</div>
			<div class="mt-8 pt-8 border-t border-base-300 text-sm text-base-content/60">
				<p>© {new Date().getFullYear()} KimoGraphics. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
