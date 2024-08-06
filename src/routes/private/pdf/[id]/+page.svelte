<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import AudioPlayer from '$lib/components/audioPlayer/AudioPlayer.svelte';
	import TextField from '$lib/components/form/TextField.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import { InternalURLs } from '$lib/utils/urls';
	import PdfViewer from '$lib/components/docViewer/PdfViewer.svelte';
	import  TextViewer from '$lib/components/docViewer/TextViewer.svelte';

	export let data: PageData;

	let pageUrl = "Three%20Billy%20Goats%20Gruff%20%E2%80%93%20CKF_1.txt";

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);

	const searchPageUrl: string = ''.concat(InternalURLs.document,"/", $form.docMain_key);
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document version "};

	const handlePageUrlChange = () => {
		pageUrl = "Three%20Billy%20Goats%20Gruff%20%E2%80%93%20CKF_19.txt";
		alert(pageUrl)
	};

</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<div class="grid grid-cols-2 gap-4 p-4 content-center h-full">
	<PdfViewer encodedFilename={data.filename}/>

	<div>
		<div id="docTabs" role="tablist" class="tabs tabs-lifted">
			<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Details" checked />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
				<div>
					<form method="POST" use:enhance >

						<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
						<input type="hidden" id="filePath" name="filePath" bind:value={$form.filePath} />
						<input type="hidden" id="docMain_key" name="docMain_key" bind:value={$form.docMain_key} />

						<TextField label="Language" id="language" bind:value={$form.language}
											 errors={$errors.language} constraints={$constraints.language}
												readOnly={true}/>
						<TextField label="Filename" id="filename" bind:value={$form.filename}
											 errors={$errors.filename} constraints={$constraints.filename}
											 readOnly={true}/>
						<TextAreaField label="Summary:" id="docText" bind:value={$form.docText}
													 errors={$errors.docText} constraints={$constraints.docText} />
						<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
												 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg, $form.language.toString(), "?")}
												 backUrl={searchPageUrl}/>
					</form>
				</div>
			</div>

			<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Audio"  />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
				<div class="p-4">
					<ul class="list-disc pl-5">
						{#if data.docVoices}
							{#each data.docVoices  as audio}
								<ul class="my-2">
									<AudioPlayer src={InternalURLs.audio.concat("/",audio.id.toString()) } title={"Page: " + audio.documentPageNumber} artist={"Voice: " + audio.voiceName} />
								</ul>
							{/each}
						{/if}
					</ul>
				</div>
			</div>

<!--			<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Image"  />-->
<!--			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">-->
<!--				{#if $form.imageUrl}-->
<!--					<img src={$form.imageUrl} alt="Generated Image for {$form.filename}" />-->
<!--				{:else}-->
<!--					<p>No Image has been generated for this file </p>-->
<!--				{/if}-->
<!--			</div>-->
			<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Text"  />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
				<label for="page">Page: </label>
				<input type="number" id="page" name="Page:" min="0" max="16" value="0" class="input input-bordered input-sm w-full max-w-xs" >
				<button on:click={handlePageUrlChange} class="btn btn-primary btn-sm">Get page</button>
				<TextViewer encodedFilename={pageUrl} label="Page 1" id="page1" readOnly={true} />
<!--				<TextViewer encodedFilename="Three%20Billy%20Goats%20Gruff%20%E2%80%93%20CKF_2.txt" label="Page 2" id="page2" readOnly={true} />-->
<!--				<TextViewer encodedFilename="Three%20Billy%20Goats%20Gruff%20%E2%80%93%20CKF_3.txt" label="Page 3" id="page3" readOnly={true} />-->
			</div>
	</div>
</div>
</div>

<!--<SuperDebug data={$form} />-->

<style>
    .invalid {
        color: red;
    }
</style>