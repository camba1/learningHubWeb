<script lang="ts">
	/**
	 * @param delayed Whether the form is in a delayed state.
	 * @param submitLbl The label for the save button.
	 * @param clearLbl The label for the delete button.
	 * @param backLbl The label for the back button/link.
	 * @param backUrl The URL to navigate back to when the back button/link is clicked.
	 * @param chatSubmitButton Reference to the button that triggers the submitting chat message.
	 * 												 This is used to trigger the form submit event on the parent during pagination.
	 */

	import { CircleArrowLeft, Save, Trash2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let delayed: boolean;
	export let submitLbl: string;
	export let clearLbl: string;
	export let backLbl: string = "";
	export let backUrl: string | undefined = undefined;
	export let chatSubmitButton : HTMLButtonElement;


	const dispatch = createEventDispatcher();

</script>

<!--
@component
A SvelteKit component representing a control panel with options to save, clear, and (optionally)navigate back.
This component is intended to be used within a chat interface for object manipulation.
It includes icons and labels for user interaction and provides visual feedback for ongoing operations.
Provides a chatSubmitButton bind element bound to the submit button that can be used to trigger the form
submit event on the parent event.
-->


<div class="p-3">
	<button name="submit" id="submit" class="btn btn-xs" bind:this={chatSubmitButton}> <Save class="w-4 h-4" /> {submitLbl}</button>
	<button
		name="clear" id="clear" type="button"
		on:click|preventDefault={() =>  dispatch('dispatchResetButtonClick')}
		class="btn  btn-xs"> <Trash2 class="w-4 h-4"/> {clearLbl}</button>
	{#if backUrl}
		<a href={backUrl} role="button" class="btn btn-xs"><CircleArrowLeft class="w-4 h-4"/>{backLbl}</a>
	{/if}
	{#if delayed}
		<span class="loading loading-spinner text-neutral"></span>
	{/if}
</div>