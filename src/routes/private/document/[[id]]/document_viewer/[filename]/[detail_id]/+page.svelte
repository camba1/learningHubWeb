<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import ViewerUI from '$lib/components/pageViewer/ViewerUI.svelte';

	export let data: PageData;

</script>
<ViewerUI
	availableFiles={data.availableFiles}
	availableImages={data.availableImages}
	editable={data.editable}
	parentFilename={data.parentFilename}
	filename={data.filename}
	docDetail_key={$page.params.detail_id}
/>