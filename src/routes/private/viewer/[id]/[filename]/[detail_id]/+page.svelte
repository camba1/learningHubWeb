<script lang="ts">
	import type { PageData } from './$types.js';
	import ViewerUI from '$lib/components/pageViewer/ViewerUI.svelte';

	export let data: PageData;

</script>
<main class="main-body">
	<ViewerUI
		availableFiles={data.availableFiles}
		availableImages={data.availableImages}
		editable={data.editable}
		parentFilename={data.parentFilename}
	/>
</main>

<style>
    .main-body {
        height: 90vh; /* Make the wrapper take the full height of the viewport */
    }
</style>