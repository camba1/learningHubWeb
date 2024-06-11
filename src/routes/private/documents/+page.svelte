<script lang="ts">
	import { SquarePlus } from 'lucide-svelte';
	import { FilePlus } from 'lucide-svelte';
	import LinkButton from '$lib/genericControls/LinkButton.svelte';
	import { InternalURLs } from '$lib/utils/urls';

	export let data;

</script>

<div class="prose prose-headings p-3 px-3">
	<h2>Documents</h2>
</div>
<div class="flex justify-end px-3">
	<LinkButton icon={SquarePlus} label="New" href={InternalURLs.document} />
	<LinkButton icon={FilePlus} label="New from file" href={InternalURLs.fileUpload} />
</div>
<div class="overflow-x-auto p-3">
	<table class="table table-xs table-pin-rows table-pin-cols">
		<thead>
		<tr>
			<th>Title</th>
			<td>Type</td>
			<td>Age Group</td>
		</tr>
		</thead>
		<tbody>
		{#each data.documents as doc}
		<tr>
			<th><a href="{InternalURLs.document}/{doc.id}">{doc.title}</a></th>
			<td>{doc.type}</td>
			<td>{doc.ageGroup}</td>
		</tr>
		{/each}
	</table>
</div>