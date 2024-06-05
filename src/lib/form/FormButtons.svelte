<script lang="ts">
	import { CircleArrowLeft, Save, Trash2 } from 'lucide-svelte';

	export let delayed: boolean;
	export let objectId: string | undefined;
	export let submitLbl: string;
	export let deleteLbl: string;
	export let confirmationDelMsg: string;
	export let backLbl: string;
	export let backUrl: string;

</script>

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