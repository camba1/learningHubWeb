<script lang="ts">

	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { InternalURLs } from '$lib/utils/urls.js';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import ImageViewer from '$lib/components/docViewer/ImageViewer.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import TextField from '$lib/components/form/TextField.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';
	import { ImagePlus, SquarePlus } from 'lucide-svelte';
	import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import TextFieldWithDelete from '$lib/components/form/TextFieldWithDelete.svelte';

	// import SuperDebug from 'sveltekit-superforms';


	export let data: PageData;

	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete location "};
	const file_category: string = "document_location";

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);

	const searchPageUrl: string = `${InternalURLs.document}/${data.document_id}`

	function regenerateImage() {
		alert("Not implemented yet, but you can ask Clio to: generate an image for location [location name]");
	}

	function removePage(value:number) {

		if ($form.pagesInDocument) {
			$form.pagesInDocument = $form.pagesInDocument.filter( (item) => item !== value);
		}
	}

	function addPage(value:number) {
		if ($form.pagesInDocument) {
			$form.pagesInDocument = [...$form.pagesInDocument, Number(value)];
		} else {
			$form.pagesInDocument = [Number(value)];
		}
	}

</script>

<SubmitToast message={$message} page_status={$page.status}/>

<div class="container mx-auto p-6">
	<h1 class="text-2xl font-bold mb-4">{$form.name}</h1>
	<div class="flex">
		<!-- Display the Image -->
		<div class="w-1/3 p-1.5 border-gray-200 border">
			{#if $form.imageFilename}
				<ImageViewer encodedFilename={$form.imageFilename} file_category={file_category}
										 encodedParentFilename={data.parentFilename}
										 alt="Image generated for this {file_category}" img_class="w-full h-auto object-contain"/>
			{:else}
				<span>No Image<br>available</span>
			{/if}
		</div>

		<div class="w-2/3 border-gray-200 px-4 ml-4 border">
			<!-- Display the Prompt in a Textarea -->
			<form method="POST" use:enhance>
				<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
				<input type="hidden" id="docMain_key" name="docMain_key" bind:value={$form.docMain_key} />
				<input type="hidden" id="imageFilename" name="imageFilename" bind:value={$form.imageFilename} />
				<input type="hidden" id="documentFilename" name="documentFilename" bind:value={$form.documentFilename} />

				<TextField label="Name" id="name" bind:value={$form.name}
									 errors={$errors.name} constraints={$constraints.name} />
				<div class="my-1">
					<span class="inline-flex items-center py-0.5">
							<FieldLabel id="prompt" label="Prompt"/>
							<DispatchButton icon={ImagePlus} label="Generate image"  on:dispatchButtonClick={() => regenerateImage()}/>
					</span>
				</div>
				<TextAreaField id="description" bind:value={$form.description}
											 errors={$errors.description} constraints={$constraints.description} />
				<span class="inline-flex items-center py-0.5">
					<FieldLabel id="pagesInDoc" label="Document pages"/>
					<DispatchButton icon={SquarePlus} label="Add"  on:dispatchButtonClick={() => addPage(0)}/>
				</span>
				<div>
					{#if $form.pagesInDocument}
						{#each $form.pagesInDocument as page, i}
							<TextFieldWithDelete id="pagesInDocument" bind:value={page}
																	 errors={$errors.pagesInDocument?.[i]} constraints={$constraints?.pagesInDocument}
																	 on:removeItemOnce={() => removePage(page)} inputClass="input input-sm w-10"/>
						{/each}
					{/if}
				</div>

				<div>
					<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
											 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg,
											 $form.name.toString(), "?")}
											 backUrl={searchPageUrl}/>
				</div>
			</form>
		</div>
	</div>
</div>

<!--<SuperDebug data={$form} />-->