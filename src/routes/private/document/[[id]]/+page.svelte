<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';

	import { InternalURLs } from '$lib/utils/urls';
	import curDocInfo from '$lib/stores/curDocInfo';

	import TextField from '$lib/components/form/TextField.svelte';
	import SelectField from '$lib/components/form/SelectField.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import ImageViwer from '$lib/components/docViewer/ImageViewer.svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';
	import PageSection from '$lib/components/genericControls/PageSection.svelte';
	import TextFieldWithDelete from '$lib/components/form/TextFieldWithDelete.svelte';
	import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';
	import { SquarePlus } from 'lucide-svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);

	$curDocInfo = {filename: $form.filename, docDetail_key: ""};

	const bookTypes: string[] = ['book', 'article', 'other'];
	const ageGroups:string[] = ['Toddler', 'Early Reader', 'Young Reader', 'Young Adult'];
	const searchPageUrl: string = InternalURLs.documents
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document "};

	function removeTagOnce(value:string) {
		if ($form.tags) {
			$form.tags = $form.tags.filter( (item) => item !== value);
		}
	}

	function removeCharacterOnce(value:string) {
		if ($form.characters) {
			$form.characters = $form.characters.filter( (item) => item !== value);
		}
	}

	function addCharacter(value:string) {
		if ($form.characters) {
			$form.characters = [...$form.characters, value];
		} else {
			$form.characters = [value];
		}
	}

	function addTag(value:string) {
		if ($form.tags) {
			$form.tags = [...$form.tags, value];
		} else {
			$form.tags = [value];
		}
	}

</script>

<SubmitToast message={$message} page_status={$page.status}/>

<div class="container mx-auto p-6">
	{#if $form._key}
		<div class="flex justify-between items-center">
			<div>
				<h1 class="text-2xl font-bold">{$form.title}</h1>
				<p class="text-gray-500 mt-1">File: {$form.filename} - {$form.pageCount} pages</p>
				<div class="mt-3 flex flex-wrap">
					{#each data.docProcessedLookups as lookup}
						<LinkButton  label={lookup.language} href={encodeURI(`${InternalURLs.document}/${$form._key}/document_detail/${$form.filename}/${lookup._key}`)} btn_additional_class="btn-outline btn-primary" />
					{/each}
					<LinkButton icon={SquarePlus} label="New Version" href={encodeURI(`${InternalURLs.document}/${$form._key}/document_detail/${$form.filename}`)}/>
				</div>
			</div>
			{#if data.image_filename}
				<ImageViwer encodedFilename={data.image_filename} alt="Image generated for this document" img_class="w-28 h-28 object-cover"/>
			{/if}
		</div>
	{/if}

	<form method="POST" use:enhance >

		<PageSection label="Information">
			<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
			<input type="hidden" id="authorId" name="authorId" bind:value={$form.authorId} />
			<input type="hidden" id="filePath" name="filePath" bind:value={$form.filePath} />
			<input type="hidden" id="filename" name="filename" bind:value={$form.filename} />
			<input type="hidden" id="pageCount" name="pageCount" bind:value={$form.pageCount} />

			<TextField label="Title" id="title" bind:value={$form.title}
								 errors={$errors.title} constraints={$constraints.title} />
			<TextField label="Author" id="authorName" bind:value={$form.authorName}
								 errors={$errors.authorName} constraints={$constraints.authorName} />
		</PageSection>

		<PageSection label="Classification">
			<SelectField label="Type" id="type" bind:value={$form.type}
									 errors={$errors.type} constraints={$constraints.type}
									 optionValues={bookTypes} />
			<SelectField label="Age Group:" id="ageGroup" bind:value={$form.ageGroup}
									 errors={$errors.ageGroup} constraints={$constraints.ageGroup}
									 optionValues={ageGroups} />
		</PageSection>

		<PageSection label="Details">
			<TextAreaField label="Summary" id="summary" bind:value={$form.summary}
										 errors={$errors.summary} constraints={$constraints.summary} />

			<span class="inline-flex items-center py-0.5">
				<FieldLabel id="characters" label="Main characters"/>
				<DispatchButton icon={SquarePlus} label="Add"  on:dispatchButtonClick={() => addCharacter("Add Character")}/>
			</span>
			<div>
				{#if $form.characters}
					{#each $form.characters as character, i}
						<TextFieldWithDelete id="characters" bind:value={character}
																 errors={$errors.characters?.[i]} constraints={$constraints?.characters}
																 on:removeItemOnce={() => removeCharacterOnce(character)}/>
					{/each}
				{/if}
			</div>

			<span class="inline-flex items-center py-0.5">
				<FieldLabel id="tags" label="Tags"/>
				<DispatchButton icon={SquarePlus} label="Add"  on:dispatchButtonClick={() => addTag("Add Tag")}/>
			</span>
			<div>
				{#if $form.tags}
					{#each $form.tags as tag, i}
						<TextFieldWithDelete id="tags" bind:value={tag}
																 errors={$errors.tags?.[i]} constraints={$constraints?.tags}
																 on:removeItemOnce={() => removeTagOnce(tag)}/>
					{/each}
				{/if}
			</div>
		</PageSection>


		<div class="flex justify-center space-x-2 mt-4">

			<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
									 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg, $form.title.toString(), "?")}
									 backUrl={searchPageUrl}/>
		</div>

	</form>
</div>

<style>
    .container {
        max-width: 900px;
    }
</style>
