<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { InternalURLs } from '$lib/utils/urls';
	import SelectField from '$lib/components/form/SelectField.svelte';
	import FormButtons from "$lib/components/form/FormButtons.svelte";
	import TextField from '$lib/components/form/TextField.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';


	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);

	const languages = ['english', 'spanish', 'french', 'german', 'italian', 'Chinese', 'japanese', 'korean', 'arabic', 'portuguese'];
	const searchPageUrl: string = ''.concat(InternalURLs.document,"/", $form.document_key);

	const btnLabels = {"submitLbl": "Submit", "backLbl": "Back"};
</script>

<SubmitToast message={$message} page_status={$page.status}/>

<div class="flex justify-center items-center h-screen">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Select Language</h2>
			<form method="POST" use:enhance>
				<input type="hidden" id="document_key" name="document_key" bind:value={$form.document_key} />
				<SelectField label="Language" id="target_language" bind:value={$form.target_language}
										 errors={$errors.target_language} constraints={$constraints.target_language}
										 optionValues={languages} />
				<TextField label="Filename" id="filename" bind:value={$form.filename}
									 errors={$errors.filename} constraints={$constraints.filename}
									 readOnly={true}/>
				<FormButtons submitLbl={btnLabels.submitLbl} backLbl={btnLabels.backLbl}
										 delayed={$delayed}
										 backUrl={searchPageUrl} />
			</form>
		</div>
	</div>
</div>