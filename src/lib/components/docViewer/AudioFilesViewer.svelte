<script lang="ts">
	import  TextViewer from '$lib/components/docViewer/TextViewer.svelte';
	import AudioPlayer from '$lib/components/audioPlayer/AudioPlayer.svelte';
	import FileLabel from '$lib/components/form/FieldLabel.svelte';



	let selectedFile:{ friendlyName: string, filename: string, audioFilename: string, speaker: string };

	export let availableFiles: typeof selectedFile[];
	export let label: string;
	// let availableFiles = [
	// 	{ friendlyName: 'Page 1', filename: 'Three Billy Goats Gruff – CKF_0.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Thalia' },
	// 	{ friendlyName: 'Page 2', filename: 'Three Billy Goats Gruff – CKF_1.txt', audioFilename: 'Three Billy Goats Gruff – CKF_18.flac', speaker: 'Jane' },
	// 	{ friendlyName: 'Page 3', filename: 'Three Billy Goats Gruff – CKF_2.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Maria' },
	// 	{ friendlyName: 'Page 4', filename: 'Three Billy Goats Gruff – CKF_3.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Thalia' },
	// 	{ friendlyName: 'Page 5', filename: 'Three Billy Goats Gruff – CKF_4.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Thalia' }
	// ];

</script>
{#if label}
<!--	<label for="file-select">Select a page:</label>-->
	<FileLabel id="file-select" label={label} />
{/if}
<select id="file-select" bind:value={selectedFile} >
	{#each availableFiles as file}
		<option value={file}>{file.friendlyName}</option>
	{/each}
</select>

{#if selectedFile}
	<TextViewer encodedFilename={selectedFile.filename} label="Page Text" id="pages" readOnly={false}/>
	<AudioPlayer src={selectedFile.audioFilename} title="Page Audio" artist={selectedFile.speaker} />
{/if}