<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	const year = new Date().getFullYear();

	function scrollToTop() {
		scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<footer class="w-full p-4">
	<div class="mx-auto flex max-w-7xl justify-between">
		<span>&copy; {year} Nate Babyak</span>
		<a href="/privacy">Privacy</a>
		<a href="/security">Security</a>
		<Button onclick={scrollToTop} variant="link">Back to Top</Button>
	</div>
</footer>
