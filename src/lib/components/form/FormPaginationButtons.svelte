<script lang="ts">
	/**
	 * @param delayed Whether the form is in a delayed state.
	 * @param submitLbl The label for the save button.
	 * @param clearLbl The label for the clear button.
	 */

	import { SquareChevronRightIcon, SquareChevronLeftIcon } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let delayed: boolean;
	export let previousLbl: string;
	export let nextLbl: string;
	export let pageNo: number;

	const dispatch = createEventDispatcher();

</script>

<!--
@component
A SvelteKit component representing a control panel with options to search and clear.
This component is intended to be used within a form that provides search functionality.
It includes icons and labels for user interaction and provides visual feedback for ongoing operations.
-->

<!--<div class="join flex justify-end px-3 mt-4">-->
	<div class="join flex justify-end px-3 mt-4">
		<button name="submit" id="submit" class="join-item btn  btn-xs" on:click={() => dispatch('previousPage')}>
			<SquareChevronLeftIcon class="w-4 h-4"/> {previousLbl}
		</button>
		<button class="join-item btn bg-base-300 btn-xs">Page {pageNo}</button>
		<button name="submit2" id="submit2" class="join-item btn  btn-xs" on:click={() => dispatch('nextPage')}>
			{nextLbl}  <SquareChevronRightIcon class="w-4 h-4"/>
		</button>
	</div>
	{#if delayed}
		<span class="loading loading-spinner text-neutral"></span>
	{/if}
<!--</div>-->