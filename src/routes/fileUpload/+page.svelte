<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { FileSchema } from '$lib/fileUpload'
	import FormButtons from '$lib/form/FormButtons.svelte';
	import { page } from '$app/stores';
	import FileUpload from '$lib/form/FileUpload.svelte';
	import { InternalURLs } from '$lib/utils/urls';

	export let data;

	const { form, enhance, errors, delayed, message } = superForm(data.form, {
		validators: zodClient(FileSchema)
	})
	const searchPageUrl: string = InternalURLs.documents;
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Not Used"};

</script>

<div class="flex justify-center">
	<h2 class="text-2xl pb-3"> File Upload </h2>
	{#if $message}
		<h3 class:invalid={$page.status >= 400}>{$message}</h3>
	{/if}
</div>

<div class="flex justify-center">

	<form method="POST" enctype="multipart/form-data" use:enhance>
		<FileUpload {form} {errors} id="file" />
		<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
								 delayed={$delayed} objectId={undefined} confirmationDelMsg={btnLabels.confirmationDelMsg}
								 backUrl={searchPageUrl}/>
	</form>
</div>