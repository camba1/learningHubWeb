<script lang="ts">
	/**
	 * @param icon The Lucide icon component
	 * @param label The button label
	 * @param href The link to navigate to when the button is clicked
	 * @param btn_class The button class. Default: "btn btn-xs mx-0.5"
	 */

	import type { ComponentType } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let icon: ComponentType | null = null;
	export let label: string;
	export let btn_additional_class: string = "";

	const dispatch = createEventDispatcher();

</script>

	<button class="btn btn-xs mx-0.5 {btn_additional_class}" type="button" on:click={() => dispatch('dispatchButtonClick')}>
		{#if icon}
			<svelte:component this={icon} class="w-4 h-4" />
		{/if}
		{label}
	</button>
