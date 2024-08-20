<script lang="ts">
	/**
	 * @param delayed Whether the form is in a delayed state.
	 * @param submitLbl The label for the save button.
	 * @param clearLbl The label for the clear button.
	 * @param reloadHref The URL to reload the page when the clear button is clicked.
	 * @param formSearchButton Reference to the button that triggers the search. This is used to
	 * 												 trigger the form submit event on the parent during pagination.
	 */

	import { FileSearch, Eraser  } from 'lucide-svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';

	export let delayed: boolean;
	export let submitLbl: string;
	export let clearLbl: string;
	export let reloadHref: string;
	export let formSearchButton : HTMLButtonElement;

</script>

<!--
@component
A SvelteKit component representing a control panel with options to search and clear.
This component is intended to be used within a form that provides search functionality.
It includes icons and labels for user interaction and provides visual feedback for ongoing operations.
-->


<div class="p-3">
	<button name="submit" id="submit" class="btn btn-xs" bind:this={formSearchButton}> <FileSearch class="w-4 h-4"/> {submitLbl}</button>
	<LinkButton icon={Eraser} label={clearLbl} href={reloadHref} />
	{#if delayed}
		<span class="loading loading-spinner text-neutral"></span>
	{/if}
</div>