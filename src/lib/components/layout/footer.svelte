<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowUp } from '@lucide/svelte';

	const year = new Date().getFullYear();

	function scrollToTop() {
		scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<footer class="w-full p-4">
	<div
		class="mx-auto flex max-w-7xl items-center justify-between text-muted-foreground underline-offset-4"
	>
		<p>
			&copy; {year} Nate Babyak
		</p>
		<a href="https://github.com/natebabyak/JobAt" target="_blank" class="hover:underline">
			Free and Open-Source Software
		</a>
		<a href="/privacy" class="hover:underline">Privacy</a>
		<a href="/security" class="hover:underline">Security</a>
		<Button onclick={scrollToTop} size="icon" title="Back to Top" variant="ghost">
			<ArrowUp />
		</Button>
	</div>
</footer>
