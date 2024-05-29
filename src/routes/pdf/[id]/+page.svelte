<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import  SuperDebug  from 'sveltekit-superforms';
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

<div class="grid grid-cols-2 gap-4">
	<iframe title="PDF Viewer" width=100% height="315"
		srcdoc={`
			<html lang="en">
				<head>
					<title>Embedded PDF</title>
					<style>
						body {
							margin: 0;
						}
						iframe {
							display: block;
							width: 100%;
							height: 100vh;
							border: none;
						}
					</style>
				</head>
				<body>
					<iframe src="data:application/pdf;base64,${data.pdfData}"></iframe>
				</body>
			</html>
		`}>
	</iframe>

	<div>Hello

		<div>
			<form method="POST" use:enhance >

				<input type="hidden" id="id" name="id" bind:value={$form.id} />

				<span>
					<label for="language" class="label label-text font-semibold" >Language: </label>
					<input
						name="language"
						id="language"
						aria-invalid={$errors.language ? 'true' : undefined}
						bind:value={$form.language}
						{...$constraints.language}
						class="input input-bordered input-sm w-full max-w-xs"
						readonly
					/>
					{#if $errors.language}<span class="invalid">{$errors.language}</span>{/if}
				</span>
				<span>
					<label for="pageCount" class="label label-text font-semibold">No. of pages: </label>
					<input
						name="pageCount"
						id="pageCount"
						aria-invalid={$errors.pageCount ? 'true' : undefined}
						bind:value={$form.pageCount}
						{...$constraints.pageCount}
						class="input input-bordered input-sm w-full max-w-xs"
						readonly
					/>
					{#if $errors.pageCount}<span class="invalid">{$errors.pageCount}</span>{/if}
				</span>
				<span>
					<label for="docText" class="label label-text font-semibold">Document Text: </label>
					<textarea
						name="docText"
						id="docText"
						aria-invalid={$errors.docText ? 'true' : undefined}
						bind:value={$form.docText}
						{...$constraints.docText}
						class="textarea textarea-bordered w-full max-w-xs"/>
					{#if $errors.docText}<span class="invalid">{$errors.docText}</span>{/if}
				</span>

				<div>
					<button name="submit" id="submit" class="btn">Submit</button> {#if $delayed}Working...{/if}
					{#if $form.id}
						<button
							name="delete" id="delete"
							on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
							class="btn btn-neutral">Delete</button>
					{/if}
				</div>

			</form>
		</div>

	</div>
</div>

<SuperDebug data={$form} />

<style>
    .invalid {
        color: red;
    }
</style>