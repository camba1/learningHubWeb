<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import TextField from '$lib/components/form/TextField.svelte';
	import SelectField from '$lib/components/form/SelectField.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import NumberField from '$lib/components/form/NumberField.svelte';
	import { InternalURLs } from '$lib/utils/urls';
	import ImageViwer from '$lib/components/docViewer/ImageViewer.svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';
	import { SquarePlus } from 'lucide-svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);
	const bookTypes: string[] = ['book', 'article', 'other'];
	const ageGroups:string[] = ['Toddler', 'Early Reader', 'Young Reader', 'Young Adult'];
	const searchPageUrl: string = InternalURLs.documents
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document "};

</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<div class="flex justify-center p-3">
	<h2>{!$form._key ? 'Create' : 'Update'} Document</h2>
</div>

<div class="flex justify-center">

	<form method="POST" use:enhance >

		<input type="hidden" id="_key" name="_key" bind:value={$form._key} />
		<input type="hidden" id="authorId" name="authorId" bind:value={$form.authorId} />
		<input type="hidden" id="filePath" name="filePath" bind:value={$form.filePath} />

		<TextField label="Title" id="title" bind:value={$form.title}
							 errors={$errors.title} constraints={$constraints.title} />
		<TextField label="Author" id="authorName" bind:value={$form.authorName}
							 errors={$errors.authorName} constraints={$constraints.authorName} />
		<SelectField label="Type" id="type" bind:value={$form.type}
								 errors={$errors.type} constraints={$constraints.type}
								 optionValues={bookTypes} />
		<SelectField label="Age Group:" id="ageGroup" bind:value={$form.ageGroup}
								 errors={$errors.ageGroup} constraints={$constraints.ageGroup}
								 optionValues={ageGroups} />
		<TextField label="Filename" id="filename" bind:value={$form.filename}
							 errors={$errors.filename} constraints={$constraints.filename}
							 readOnly={true}/>
		<NumberField label="Page Count" id="pageCount" bind:value={$form.pageCount}
							 errors={$errors.pageCount} constraints={$constraints.pageCount}
							 readOnly={true}/>
		<TextAreaField label="Summary" id="summary" bind:value={$form.summary}
									 errors={$errors.summary} constraints={$constraints.summary} />
		<FieldLabel id="characters" label="Main characters"/>
		{#if $form.characters}
			<!--{$form.tags.length}-->
			{#each $form.characters as _, i}
				<TextField id="tags" bind:value={$form.characters[i]}
									 errors={$errors.characters?.[i]} constraints={$constraints?.characters} />
			{/each}
		{/if}
		<FieldLabel id="tags" label="Tags"/>
		{#if $form.tags}
			<!--{$form.tags.length}-->
			{#each $form.tags as _, i}
				<TextField id="tags" bind:value={$form.tags[i]}
								 errors={$errors.tags?.[i]} constraints={$constraints.tags} />
			{/each}
		{/if}
		<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
								 delayed={$delayed} objectId={$form._key} confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg, $form.title.toString(), "?")}
								 backUrl={searchPageUrl}/>
	</form>
</div>

{#if data.image_filename}
	<FieldLabel id="docImage" label="Generated image"/>
	<ImageViwer encodedFilename={data.image_filename} alt="Image generated for this document"/>
{/if}

{#if $form._key}
	<div class="flex justify-center">
		<div>
			<label for="docVersions" class="label label-text font-semibold">Document versions: </label>
			<LinkButton icon={SquarePlus} label="New Version" href={encodeURI(`${InternalURLs.document}/${$form._key}/document_detail/${$form.filename}`)}/>
		</div>
		<div>
			<table id="docVersions" class="table table-xs">
				<tbody>
					{#each data.docProcessedLookups as lookup}
						<tr>
<!--							<td><a class="link" href="{InternalURLs.pdf}/{lookup._key}?filename={$form.filename}" >{lookup.language}</a></td>-->
							<td><a class="link" href={encodeURI(`${InternalURLs.document}/${$form._key}/document_detail/${$form.filename}/${lookup._key}`)} >{lookup.language}</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<br>
	<br>
{/if}

<!--<SuperDebug data={$form} />-->

<style>
    .invalid {
        color: red;
    }
</style>