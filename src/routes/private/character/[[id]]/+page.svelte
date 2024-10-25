<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { InternalURLs } from '$lib/utils/urls.js';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import ImageViewer from '$lib/components/docViewer/ImageViewer.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';
	import TextField from '$lib/components/form/TextField.svelte';
	import { SquarePlus, ImagePlus } from 'lucide-svelte';
	import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import type { CharacterDocumentSchemaType } from '$lib/schemas/characters'
	import TextFieldWithDelete from '$lib/components/form/TextFieldWithDelete.svelte';

	export let data: PageData;
	const searchPageUrl: string = InternalURLs.characters
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document "};
	const file_category: string = "character";


	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false,
			dataType: 'json'
		}
	);


	function addDocument() {
		// TODO: Ww need a document lookup here
		alert(" Not implemented... yet");
	// 	let value:CharacterDocumentSchemaType = {"docMain_key": "", "name": "Add Document"};
	// 	if ($form.documents) {
	// 		$form.documents = [...$form.documents, value];
	// 	} else {
	// 		$form.documents = [value];
	// 	}
	}

	function removeDocumentOnce(value:CharacterDocumentSchemaType) {
		console.log(value);
		alert(" Not implemented... yet");
		// if ($form.documents) {
		// 	$form.documents = $form.documents.filter( (item: CharacterDocumentSchemaType) => item !== value);
		// }
	}

	function regenerateImage() {
		alert("Not implemented... yet");
	}

</script>

<SubmitToast message={$message} page_status={$page.status}/>

<div class="container mx-auto p-6">
	<h1 class="text-2xl font-bold mb-4">{$form.name}</h1>
	<div class="flex">
			<!-- Display the Image -->
			<div class="w-1/3 pr-4 border-gray-200 border">
				{#if $form.imageFilename}
					<ImageViewer encodedFilename={$form.imageFilename} file_category={file_category} alt="Image generated for this {file_category}" img_class="w-full h-auto object-cover"/>
				{:else}
					<span>No Image<br>available</span>
				{/if}
			</div>

		<div class="w-2/3 border-gray-200 px-4 ml-4 border">
			<!-- Display the Prompt in a Textarea -->
			<form method="POST" use:enhance>
				<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
				<TextField label="Name" id="name" bind:value={$form.name}
									 errors={$errors.name} constraints={$constraints.name} />
				<div class="mb-2">
					<span class="inline-flex items-center py-0.5">
							<FieldLabel id="prompt" label="Prompt"/>
							<DispatchButton icon={ImagePlus} label="Create character sheet"  on:dispatchButtonClick={() => regenerateImage()}/>
					</span>
				</div>
				<TextAreaField id="prompt" bind:value={$form.prompt}
											 errors={$errors.prompt} constraints={$constraints.prompt} />
				<span class="inline-flex items-center py-0.5">
						<FieldLabel id="documents" label="Documents"/>
						<DispatchButton icon={SquarePlus} label="Add"  on:dispatchButtonClick={() => addDocument()}/>
				</span>
				<div>
					{#if $form.documents}
						{#each $form.documents as document, i}
							<TextFieldWithDelete id="documents" bind:value={document.name}
																	 errors={$errors.documents?.[i]?.name} constraints={$constraints?.dcouments}
																	 on:removeItemOnce={() => removeDocumentOnce(document)}/>
						{/each}
					{/if}
					<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
											 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg,
											 $form.name.toString(), "?")}
											 backUrl={searchPageUrl}/>
				</div>
			</form>
		</div>
	</div>
</div>
