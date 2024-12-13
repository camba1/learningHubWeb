<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import AudioFilesViewer from '$lib/components/docViewer/AudioFilesViewer.svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';
	import { InternalURLs } from '$lib/utils/urls';
	import { CircleArrowLeft } from 'lucide-svelte';

	export let data: PageData;
</script>

<div class="border-base-400 border rounded-box p-6 m-6">
	<div class="p-4">
		{#if data.availableFiles}
			<AudioFilesViewer availableFiles={data.availableFiles} label="Edit Audio for" />
		{/if}
		<LinkButton label="Back" icon={CircleArrowLeft} href="{InternalURLs.document}/{$page.params.id}/document_viewer/{$page.params.filename}/{$page.params.detail_id}" />
	</div>
</div>