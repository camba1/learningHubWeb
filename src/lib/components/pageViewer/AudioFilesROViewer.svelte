<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TextROViewer from '$lib/components/pageViewer/TextROViewer.svelte';
	import AudioROPlayer from '$lib/components/pageViewer/AudioROPlayer.svelte';
	import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let selectedFile: PageSchemaType;

	export let availableFiles: PageSchemaType[];
	export let label: string;

	const dispatch = createEventDispatcher();

	// Function to get the index of the currently selected file
	const getSelectedIndex = () => availableFiles.findIndex(file => file === selectedFile);

	// Function to go to the next file
	const goToNextFile = () => {
		const currentIndex = getSelectedIndex();
		const nextIndex = (currentIndex + 1) % availableFiles.length; // Loop back to the start if at the end
		selectedFile = availableFiles[nextIndex];
		dispatch('fileIndexChange', {index: nextIndex })
	};

	// Function to go to the previous file
	const goToPreviousFile = () => {
		const currentIndex = getSelectedIndex();
		const previousIndex = (currentIndex - 1 + availableFiles.length) % availableFiles.length; // Loop back to the end if at the start
		selectedFile = availableFiles[previousIndex];
		dispatch('fileIndexChange', {index: previousIndex })
	};

	// Function to handle when a new file is selected from the dropdown
	const handleSelectChange = () => {
		const currentIndex = getSelectedIndex();
		dispatch('fileIndexChange', { index: currentIndex });
	};

</script>

<div class="mb-3 mt-1 flex justify-end">
	<span class="text-sm font-semibold text-[#4F9796] mr-2">{label}</span>
	<select id="file-select" bind:value={selectedFile}  on:change={handleSelectChange} class="border border-accent text-[#4F9796] rounded px-2 py-1" >
		{#each availableFiles as file}
			{#if file.audioFilename}
				<option value={file} class="color: #4F9796">{file.number}  &#9205;</option>
			{:else}
				<option value={file}>{file.number} </option>
			{/if}
		{/each}
	</select>
</div>

{#if selectedFile}
	<div class="m-4 p-4">
		{#if selectedFile.filename}
			<TextROViewer encodedFilename={selectedFile.filename} />
		{/if}
	</div>
{/if}

<div class="mt-4 flex justify-between">
		<button on:click={goToPreviousFile} class="btn btn-circle btn-outline btn-accent btn-sm mx-1">
			<ChevronLeft color="#3e9392" />
		</button>
		<div>
			{#if selectedFile && selectedFile.audioFilename}
				<AudioROPlayer src={selectedFile.audioFilename} disabled={!selectedFile.audioFilename}/>
			{/if}
		</div>
		<button on:click={goToNextFile} class="btn btn-circle btn-outline btn-accent btn-sm mx-1">
			<ChevronRight color="#3e9392"/>
		</button>
</div>