<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { Save, Trash2, CircleArrowLeft } from 'lucide-svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);
</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<div class="flex justify-center">
	<h2>{!$form.id ? 'Create' : 'Update'} Document</h2>
</div>

<div class="flex justify-center">

	<form method="POST" use:enhance >

		<input type="hidden" id="id" name="id" bind:value={$form.id} />

		<span>
			<label for="title" class="label label-text font-semibold">Title: </label>
			<input
				name="title"
				id="title"
				aria-invalid={$errors.title ? 'true' : undefined}
				bind:value={$form.title}
				{...$constraints.title}
				class="input input-bordered input-sm w-full max-w-xs"
			/>
			{#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}
		</span>

		<span>
			<label for="type" class="label label-text font-semibold">Type: </label>
			<select
				name="type"
				id="type"
				aria-invalid={$errors.type ? 'true' : undefined}
				bind:value={$form.type}
				{...$constraints.type}
				class="select select-bordered w-full max-w-xs">
				<option disabled selected>Types</option>
				<option>book</option>
				<option>article</option>
				<option>other</option>
			</select>
			{#if $errors.type}<span class="invalid">{$errors.type}</span>{/if}
		</span>

		<span>
			<label for="ageGroup" class="label label-text font-semibold">Age Group: </label>
			<select
				name="ageGroup"
				id="ageGroup"
				aria-invalid={$errors.ageGroup ? 'true' : undefined}
				bind:value={$form.ageGroup}
				{...$constraints.ageGroup}
				class="select select-bordered w-full max-w-xs">
				<option disabled selected>Age groups</option>
				<option>toddler</option>
				<option>youth</option>
				<option>young adult</option>
			</select>
			{#if $errors.ageGroup}<span class="invalid">{$errors.ageGroup}</span>{/if}
		</span>

		<span>
			<label for="summary" class="label label-text font-semibold">Summary: </label>
			<textarea
				name="summary"
				id="summary"
				aria-invalid={$errors.summary ? 'true' : undefined}
				bind:value={$form.summary}
				{...$constraints.summary}
				class="textarea textarea-bordered"/>
			{#if $errors.summary}<span class="invalid">{$errors.summary}</span>{/if}
		</span>

		<span>
			<label for="tags" class="label label-text font-semibold">Tags: </label>
			<input
				name="tags"
				id="tags"
				aria-invalid={$errors.tags ? 'true' : undefined}
				bind:value={$form.tags}
				{...$constraints.tags}
				class="input input-bordered input-sm w-full max-w-xs"
			/>
			{#if $errors.tags}<span class="invalid">{$errors.tags}</span>{/if}
		</span>

		<div class="p-3">
			<button name="submit" id="submit" class="btn btn-sm"> <Save class="w-4 h-4"/> Submit</button> {#if $delayed}Working...{/if}
			{#if $form.id}
				<button
					name="delete" id="delete"
					on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
					class="btn  btn-sm"> <Trash2 class="w-4 h-4"/> Delete</button>
			{/if}
			<a href="/documents" role="button" class="btn btn-sm"><CircleArrowLeft class="w-4 h-4"/>Back</a>
		</div>

	</form>
</div>

{#if $form.id}
	<div class="flex justify-center">
		<div>
			<label for="docVersions" class="label label-text font-semibold">Document versions: </label>
		<div>
			<table id="docVersions" class="table table-xs">
				<tbody>
					{#each data.docProcessedLookups as lookup}
						<tr>
							<td><a class="link" href="/pdf/{lookup.id}" >{lookup.language}</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		</div>
	</div>
{/if}
<style>
    .invalid {
        color: red;
    }
</style>