<script lang="ts">
	import type { PageData } from './$types.js';
	import ViewerUI from '$lib/components/pageViewer/ViewerUI.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

</script>
<main class="main-body">
	<ViewerUI
		availableFiles={data.availableFiles}
		availableImages={data.availableImages}
		editable={data.editable}
		parentFilename={data.parentFilename}
		filename={data.filename}
		docDetail_key={$page.params.detail_id}
	/>
</main>

<style>
    .main-body {
        height: 90vh; /* Make the wrapper take the full height of the viewport */
    }
</style>