<script lang="ts">
	/**
	 * @param delayed Whether the form is in a delayed state.
	 * @param objectId The ID of the object being edited.
	 * @param submitLbl The label for the save button.
	 * @param deleteLbl The label for the delete button.
	 * @param confirmationDelMsg The confirmation message for the delete button.
	 * @param backLbl The label for the back button/link.
	 * @param backUrl The URL to navigate back to when the back button/link is clicked.
	 */

	import { CircleArrowLeft, Save, Trash2 } from 'lucide-svelte';

	export let delayed: boolean;
	export let objectId: string | undefined = undefined;
	export let submitLbl: string;
	export let deleteLbl: string = "";
	export let confirmationDelMsg: string = "";
	export let backLbl: string;
	export let backUrl: string;

</script>

<!--
@component
A SvelteKit component representing a control panel with options to save, delete, and navigate back.
This component is intended to be used within a form for object manipulation.
It includes icons and labels for user interaction and provides visual feedback for ongoing operations.
-->


<div class="p-3">
	<button name="submit" id="submit" class="btn btn-xs"> <Save class="w-4 h-4"/> {submitLbl}</button> {#if delayed}Working...{/if}
	{#if objectId}
		<button
			name="delete" id="delete"
			on:click={(e) => !confirm(confirmationDelMsg) && e.preventDefault()}
			class="btn  btn-xs"> <Trash2 class="w-4 h-4"/> {deleteLbl}</button>
	{/if}
	<a href={backUrl} role="button" class="btn btn-xs"><CircleArrowLeft class="w-4 h-4"/>{backLbl}</a>
</div>