<script lang="ts">
	import TextViewer from '$lib/components/docViewer/TextViewer.svelte';
	import AudioPlayer from '$lib/components/audioPlayer/AudioPlayer.svelte';
	import FileLabel from '$lib/components/form/FieldLabel.svelte';
	import type { PageSchemaType } from '$lib/schemas/documentDetailPages';


	let selectedFile: PageSchemaType;

	export let availableFiles: PageSchemaType[];
	export let label: string;

</script>
{#if label}
<!--	<label for="file-select">Select a page:</label>-->
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

{#if selectedFile}
	<TextViewer encodedFilename={selectedFile.filename} label="Page Text" id="pages" readOnly={false}/>
	{#if selectedFile.audioFilename}
		<AudioPlayer src={selectedFile.audioFilename} title="Page Audio" artist="" />
	{/if}
{/if}