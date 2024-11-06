<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import DispatchButton from '$lib/components/genericControls/DispatchButton.svelte';
	import { Save } from 'lucide-svelte';

	export let label: string
	export let id: string
	export let readOnly: boolean = false;
	export let encodedFilename: string;
	export let btnLabel: string = "";

	const dispatch = createEventDispatcher();
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

	// Dispatch an event with the necessary data
	function btnClick() {
		alert('btnClick')
		dispatch('txtViewerBtnClick', { filename: encodedFilename, content: textContent });
	}

</script>

{#if textContent}
	<div>
		<div class="inline-flex items-center py-0.5"><!-- Container for the label and button -->
			<FieldLabel id={id} label={label} />
			{#if btnLabel}
				<span class="mr-1">
					<DispatchButton icon={Save} label={btnLabel} on:dispatchButtonClick={btnClick} />
				</span>
			{/if}
		</div>
	</div>
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

