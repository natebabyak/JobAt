<script lang="ts">
	const { class: className }: { class?: string } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" class={className}>
	<path
		d="M 0 1 C 0 1, 1 1, 1 0 C 1 0, 1 1, 2 1 C 2 1, 1 1, 1 2 C 1 2, 1 1, 0 1"
		fill="currentColor"
	/>
</svg>
