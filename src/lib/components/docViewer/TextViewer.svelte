<script lang="ts">
	import { onMount } from 'svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';

	export let label: string
	export let id: string
	export let readOnly: boolean = false;


	export let encodedFilename: string;
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
	<FieldLabel id={id} label={label}/>
	<textarea
		name={id}
		id={id}
		bind:value={textContent}
		class="textarea textarea-bordered resize w-full"
		readonly={readOnly}
	/>
{:else}
	<p>Loading...</p>
{/if}

