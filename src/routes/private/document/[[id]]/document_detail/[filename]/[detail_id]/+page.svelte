<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import TextField from '$lib/components/form/TextField.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import { InternalURLs } from '$lib/utils/urls';
	import PdfViewer from '$lib/components/docViewer/PdfViewer.svelte';
	import MarkdownViewer from '$lib/components/docViewer/MarkdownViewer.svelte';
	import AudioFilesViewer from '$lib/components/docViewer/AudioFilesViewer.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);

	const searchPageUrl: string = ''.concat(InternalURLs.document,"/", $form.docMain_key);
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document version "};

</script>

<SubmitToast message={$message} page_status={$page.status}/>

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
					{#if data.availableFiles}
						<AudioFilesViewer availableFiles={data.availableFiles} label="Select a Page:" />
					{/if}
				</div>
			</div>


			<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Text"  />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
				<div class="p-4">
					{#if $form.filename}
						<MarkdownViewer encodedFilename={$form.filename} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<!--<SuperDebug data={$form} />-->