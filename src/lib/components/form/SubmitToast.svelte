
<script lang="ts">
	import { CircleX, SquareCheck } from 'lucide-svelte';

	export let message:string | null | undefined;
	export let page_status:number;

	$: if (message) {
		setTimeout(() => {
			message = null;
		}, 3000);
	}

</script>

{#if message}
	<div class="toast">
		{#if (page_status >= 400)}
			<div class="alert alert-error">
				<CircleX class="w-5 h-5"/> {message}
			</div>
		{:else}
			<div class="alert alert-success">
				<SquareCheck class="w-5 h-5"/> {message}
			</div>
		{/if}
	</div>
{/if}