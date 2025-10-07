<script lang="ts">
	const { class: className }: { class?: string } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" class={className}>
	<defs>
		<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="25%" stop-color="#fff" />
			<stop offset="75%" stop-color="#7d7dff" />
		</linearGradient>
	</defs>
	<path
		d="M 0 1 C 0 1, 1 1, 1 0 C 1 0, 1 1, 2 1 C 2 1, 1 1, 1 2 C 1 2, 1 1, 0 1"
		fill="url(#gradient)"
	/>
</svg>
