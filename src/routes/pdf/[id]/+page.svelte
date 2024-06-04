<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	// import  SuperDebug  from 'sveltekit-superforms';
	import AudioPlayer from '$lib/audioPlayer/AudioPlayer.svelte';
	import { CircleArrowLeft } from 'lucide-svelte';

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

<div class="grid grid-cols-2 gap-4 p-4 content-center h-full">
	<iframe title="PDF Viewer" width=100% height="100%"
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

	<div>
		<div id="docTabs" role="tablist" class="tabs tabs-lifted">
			<input type="radio" name="docDetailsTabsGroup" role="tab" class="tab" aria-label="Details" checked />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
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
							<a href="/document/{$form.documentId}" role="button" class="btn btn-sm"><CircleArrowLeft class="w-4 h-4"/>Back</a>
						</div>

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
									<AudioPlayer src={"/audio/".concat(audio.id.toString()) } title={"Page: " + audio.documentPageNumber} artist={"Voice: " + audio.voiceName} />
								</ul>
							{/each}
						{/if}
					</ul>
				</div>
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