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
		<div class="form-control mt-3 border-gray-200 border rounded-lg">
			<label class="label cursor-pointer">
				<span class="label-text">Remove header and footer <br/> (adds processing time) </span>
				<input id="removeHeaderFooter" name="removeHeaderFooter"
							 bind:checked={$form.removeHeaderFooter} type="checkbox"
							 class="checkbox checkbox-xs" />
			</label>
		</div>
		<div class="flex justify-center space-x-2 mt-4">
			<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
									 delayed={$delayed} objectId={undefined} confirmationDelMsg={btnLabels.confirmationDelMsg}
									 backUrl={searchPageUrl}/>
		</div>
	</form>
</div>