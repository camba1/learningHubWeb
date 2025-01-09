<script lang="ts">

	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { InternalURLs } from '$lib/utils/urls.js';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import ImageViewer from '$lib/components/docViewer/ImageViewer.svelte';
	import VideoPlayer from '$lib/components/docViewer/VideoPlayer.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';
	import { ImagePlus, Video } from 'lucide-svelte';
	import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import TextField from '$lib/components/form/TextField.svelte';

	// import SuperDebug from 'sveltekit-superforms';


	export let data: PageData;

	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete image "};
	const file_category: string | undefined = data.file_category;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);
	const docDetail_id = $page.url.searchParams.get("detail")
	const viewerUrl = `${InternalURLs.document}/${$page.params.id}/document_viewer/${$page.params.filename}/${docDetail_id}`
	const searchPageUrl: string = docDetail_id ? viewerUrl : `${InternalURLs.document}/${data.document_id}`

	function regenerateImage() {
		alert("Not implemented yet, but you can ask Clio to: generate image");
	}

	function animateImage() {
		alert("Not implemented yet, but you can ask Clio to: animate image");
	}

</script>

<SubmitToast message={$message} page_status={$page.status}/>

<div class="container mx-auto p-6">
	<h1 class="text-2xl font-bold mb-4">Document Image</h1>
	<div class="flex">
		<!-- Display the Image -->
		<div class="w-1/3 p-1.5 border-gray-200 border">
			<div class="pt-3">
				{#if $form.imageFilename}
					<ImageViewer encodedFilename={$form.imageFilename} file_category={file_category}
											 encodedParentFilename={data.parentFilename}
											 alt="Image generated for this {file_category}" img_class="w-full h-auto object-contain"/>
				{:else}
					<span>No Image<br>available</span>
				{/if}
			</div>
			<div class="pt-10">
				{#if $form.animationFilename}
					<VideoPlayer encodedFilename={$form.animationFilename}
											 encodedParentFilename={data.parentFilename} />
				{/if}
			</div>
		</div>

		<div class="w-2/3 border-gray-200 px-4 ml-4 border">
			<!-- Display the Prompt in a Textarea -->
			<form method="POST" use:enhance>
				<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
				<input type="hidden" id="docMain_key" name="docMain_key" bind:value={$form.docMain_key} />
				<input type="hidden" id="imageFilename" name="imageFilename" bind:value={$form.imageFilename} />
				<input type="hidden" id="documentFilename" name="documentFilename" bind:value={$form.documentFilename} />
				<input type="hidden" id="pageNumber" name="pageNumber" bind:value={$form.pageNumber} />
<!--				<input type="hidden" id="pageFriendlyName" name="pageFriendlyName" bind:value={$form.pageFriendlyName} />-->

				<div class="my-3">
				<TextField label="Image for" id="pageFriendlyName" bind:value={$form.pageFriendlyName}
									 errors={$errors.pageFriendlyName} constraints={$constraints.pageFriendlyName}
									 readOnly={true}/>
				</div>

				<div class="mb-3">
					<span class="inline-flex items-center py-0.5">
							<FieldLabel id="prompt" label="Prompt"/>
							<DispatchButton icon={ImagePlus} label="Generate image"  on:dispatchButtonClick={() => regenerateImage()}/>
					</span>
				</div>
				<TextAreaField id="prompt" bind:value={$form.prompt}
											 errors={$errors.prompt} constraints={$constraints.prompt} />
<!--				<div>-->

				<div class="mb-3">
				<span class="inline-flex items-center py-0.5">
						<FieldLabel id="animationPrompt" label="Image animation prompt"/>
						<DispatchButton icon={Video} label="Animate image"  on:dispatchButtonClick={() => animateImage()}/>
				</span>
				</div>
				<TextAreaField id="animationPrompt" bind:value={$form.animationPrompt}
											 errors={$errors.animationPrompt} constraints={$constraints.animationPrompt} />
				<div>

					<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
											 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg,
											  "?")}
											 backUrl={searchPageUrl}/>
				</div>
			</form>
		</div>
	</div>
</div>

<!--<SuperDebug data={$form} />-->