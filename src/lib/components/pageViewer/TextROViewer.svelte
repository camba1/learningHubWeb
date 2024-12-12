<script lang="ts">
	import { onMount } from 'svelte';
	// import { createEventDispatcher } from 'svelte';
	// import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';

	export let encodedFilename: string;

	// const dispatch = createEventDispatcher();
	let textContent = '';
	let fileUrl = '';

	$: {
		fileUrl = `/private/fileProxy?filename=${encodeURIComponent(encodedFilename)}`;
	}

	onMount(async () => {
		if (encodedFilename) {
			const response = await fetch(fileUrl);
			textContent = await response.text();
		}
	});

	$: if (encodedFilename) {
		(async () => {
			const response = await fetch(fileUrl);
			textContent = await response.text();
		})()
	}


</script>

{#if textContent}
<!--	<h4>{textContent}</h4>-->
	<p class="text-lg text-gray-800 leading-relaxed">
		{textContent}
	</p>
{:else}
	<p>Loading...</p>
{/if}

