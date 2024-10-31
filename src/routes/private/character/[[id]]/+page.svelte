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
	import { ImagePlus } from 'lucide-svelte';
	import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import  { type DocumentsByCharacterSchemaType } from '$lib/schemas/characters';


	// import SuperDebug from 'sveltekit-superforms';

	export let data: PageData;
	const searchPageUrl: string = InternalURLs.characters
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document "};
	const file_category: string = "character";
	const doc_file_category: string = "document_character";


	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false,
			dataType: 'json'
		}
	);


	function regenerateImage() {
		alert("Not implemented... yet");
	}

	let bookTitles = data.docs;

	let selectedBook:DocumentsByCharacterSchemaType | null = null;

	function selectBook(book: DocumentsByCharacterSchemaType) {
		selectedBook = book;
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

		<div class="w-2/3  px-4 ml-4">
			<!-- Display the Prompt in a Textarea -->
			<div>
				<div id="docTabs" role="tablist" class="tabs tabs-lifted">
					<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Details" checked />
					<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
						<div>
							<form method="POST" use:enhance>
								<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
								<TextField label="Name" id="name" bind:value={$form.name}
													 errors={$errors.name} constraints={$constraints.name} />
								<div class="mb-2">
									<span class="inline-flex items-center py-0.5">
											<FieldLabel id="prompt" label="Prompt"/>
											<DispatchButton icon={ImagePlus} label="Generate image"  on:dispatchButtonClick={() => regenerateImage()}/>
									</span>
								</div>
								<TextAreaField id="prompt" bind:value={$form.prompt}
															 errors={$errors.prompt} constraints={$constraints.prompt} />
								<div>
									<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
															 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg,
															 $form.name.toString(), "?")}
															 backUrl={searchPageUrl}/>
								</div>
							</form>
						</div>
					</div>
					<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Images"  />
					<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
						<!-- Books Display -->
						<div class="flex">
							<!-- Book Titles -->
							<div class="w-1/3 space-y-2">
								{#if bookTitles}
									{#each bookTitles as book}
										<div>
											<button class="btn btn-ghost" on:click|preventDefault={() => selectBook(book)}>{book.document_title}</button>
										</div>
									{/each}
								{/if}
							</div>
							<div class="divider divider-horizontal"/>
							<!-- Selected Book -->
							<div class="w-2/3 pl-4">
								{#if selectedBook}
									<div class="card shadow-lg">
										<figure>
										{#if selectedBook.imageFilename}
											<ImageViewer encodedFilename={selectedBook.imageFilename} file_category={doc_file_category}
																	 encodedParentFilename={selectedBook.documentFilename}
																	 alt="Image generated for book {selectedBook.document_title}" img_class="w-full h-auto object-cover"/>
										{:else}
											<span>No Image<br>available</span>
										{/if}
										</figure>
										<div class="card-body items-center text-center">
											<a href={InternalURLs.document +"/" + selectedBook.docMain_key +  "/document_character/" + selectedBook.documentFilename + "/" + selectedBook._key} class="link link-primary">{$form.name}</a> in
											<a href={InternalURLs.document +"/" + selectedBook.docMain_key} class="link link-primary">{selectedBook.document_title}</a>
										</div>
									</div>
								{:else}
									<div>Please select a book</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--<SuperDebug data={$form} />-->