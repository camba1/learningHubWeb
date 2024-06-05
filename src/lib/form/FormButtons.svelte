<script lang="ts">
	import { CircleArrowLeft, Save, Trash2 } from 'lucide-svelte';

	/**
	 * A boolean indicating whether there is a delay in the operation (e.g., saving).
	 * @default false
	 */
	export let delayed: boolean;

	/**
	 * The unique identifier of the object being manipulated. If provided, the delete button will be displayed.
	 */
	export let objectId: string | undefined;

	/**
	 * The label for the save button.
	 */
	export let submitLbl: string;

	/**
	 * The label for the delete button.
	 */
	export let deleteLbl: string;

	/**
	 * A confirmation message displayed when the user attempts to delete the object.
	 */
	export let confirmationDelMsg: string;

	/**
	 * The label for the back button/link.
	 */
	export let backLbl: string;

	/**
	 * The URL to navigate back to when the back button/link is clicked.
	 */
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