<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	// import  SuperDebug  from 'sveltekit-superforms';
	import TextField from '$lib/form/TextField.svelte';
	import SelectField from '$lib/form/SelectField.svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import FieldLabel from '$lib/form/FieldLabel.svelte';
	import FormButtons from '$lib/form/FormButtons.svelte';
	import { InternalURLs } from '$lib/utils/urls';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);
	const bookTypes: string[] = ['book', 'article', 'other'];
	const ageGroups:string[] = ['toddler','youth','young adult'];
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

		<TextField label="Title" id="title" bind:value={$form.title}
							 errors={$errors.title} constraints={$constraints.title} />
		<SelectField label="Type" id="type" bind:value={$form.type}
								 errors={$errors.type} constraints={$constraints.type}
								 optionValues={bookTypes} />
		<SelectField label="Age Group:" id="ageGroup" bind:value={$form.ageGroup}
								 errors={$errors.ageGroup} constraints={$constraints.ageGroup}
								 optionValues={ageGroups} />
		<TextAreaField label="Summary" id="summary" bind:value={$form.summary}
									 errors={$errors.summary} constraints={$constraints.summary} />
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

{#if $form._key}
	<div class="flex justify-center">
		<div>
			<label for="docVersions" class="label label-text font-semibold">Document versions: </label>
		<div>
			<table id="docVersions" class="table table-xs">
				<tbody>
					{#each data.docProcessedLookups as lookup}
						<tr>
							<td><a class="link" href="{InternalURLs.pdf}/{lookup._key}" >{lookup.language}</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		</div>
	</div>
{/if}

<!--<SuperDebug data={$form} />-->

<style>
    .invalid {
        color: red;
    }
</style>