<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { FileSchema } from '$lib/fileUpload'
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import { page } from '$app/stores';
	import FileUpload from '$lib/components/form/FileUpload.svelte';
	import { InternalURLs } from '$lib/utils/urls';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';

	export let data;

	const { form, enhance, errors, delayed, message } = superForm(data.form, {
		validators: zodClient(FileSchema)
	})
	const searchPageUrl: string = InternalURLs.documents;
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Not Used"};

</script>

<div class="flex justify-center">
	<div class="flex flex-col">
		<h2 class="text-2xl p-3 "> File Upload </h2>
		<span class="pb-3">
			<SubmitToast message={$message} page_status={$page.status}/>
		</span>
	</div>
</div>

<div class="flex justify-center">

	<form method="POST" enctype="multipart/form-data" use:enhance>
		<FileUpload {form} {errors} id="file" />
		<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
								 delayed={$delayed} objectId={undefined} confirmationDelMsg={btnLabels.confirmationDelMsg}
								 backUrl={searchPageUrl}/>
	</form>
</div>