<script lang="ts">
	import TextViewer from '$lib/components/docViewer/TextViewer.svelte';
	import AudioPlayer from '$lib/components/audioPlayer/AudioPlayer.svelte';
	import FileLabel from '$lib/components/form/FieldLabel.svelte';
	import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
	import { InternalURLs } from '$lib/utils/urls';


	let selectedFile: PageSchemaType;

	export let availableFiles: PageSchemaType[];
	export let label: string;

	// Define the event detail type
	interface SaveEventDetail {
		filename: string;
		content: string;
	}

	// Function to handle the event from TextViewer
	async function updateContent(event: CustomEvent<SaveEventDetail>) {
		const { filename, content } = event.detail;
		const file_category = 'document';

			await fetch(InternalURLs.updateFile, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ filename, content, file_category })
			});
	}

</script>
<div class="mb-6">
	{#if label}
		<FileLabel id="file-select" label={label} />
	{/if}
	<select id="file-select" bind:value={selectedFile} >
		{#each availableFiles as file}
			{#if file.audioFilename}
				<option value={file}>{file.friendlyName}  &#9205;</option>
			{:else}
				<option value={file}>{file.friendlyName} </option>
			{/if}
		{/each}
	</select>
</div>
{#if selectedFile}
	<div class="mb-4">
		<TextViewer encodedFilename={selectedFile.filename}
								label="Page Text" id="pages" readOnly={false}
								btnLabel={"Save " + selectedFile.friendlyName.toLowerCase()}
								on:txtViewerBtnClick={updateContent}
		/>
	</div>
	{#if selectedFile.audioFilename}
		<AudioPlayer src={selectedFile.audioFilename} title="Page Audio" artist="" />
	{/if}
{/if}