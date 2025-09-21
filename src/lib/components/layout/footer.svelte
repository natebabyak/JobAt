<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowUp } from '@lucide/svelte';
</script>

<footer class="w-full p-4">
	<div class="mx-auto flex max-w-7xl justify-between">
		<Button href="https://github.com/natebabyak/JobAt/blob/main/LICENSE.txt" variant="link">
			&copy; {new Date().getFullYear()} Nate Babyak
		</Button>
		<Button href="/privacy" variant="link">Privacy</Button>
		<Button href="/security" variant="link">Security</Button>
		<Button
			onclick={() =>
				scrollTo({
					top: 0,
					behavior: 'smooth'
				})}
			size="icon"
			title="Back to Top"
			variant="ghost"
		>
			<ArrowUp />
		</Button>
	</div>
</footer>
