<script lang="ts">
	import type { PageData } from './$types.js';
	import ViewerUI from '$lib/components/pageViewer/ViewerUI.svelte';

	export let data: PageData;

</script>
<ViewerUI
	availableFiles={data.availableFiles}
	availableImages={data.availableImages}
	editable={data.editable}
	parentFilename={data.parentFilename}
/>