<script lang="ts">
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { AtSign } from '@lucide/svelte';
	import { REGEXP_ONLY_DIGITS } from 'bits-ui';
</script>

<main class="flex h-screen items-center">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Content>
			<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS}>
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells.slice(0, 3) as cell}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
					<InputOTP.Separator />
					<InputOTP.Group>
						{#each cells.slice(3, 6) as cell}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
		</Card.Content>
	</Card.Root>
</main>
