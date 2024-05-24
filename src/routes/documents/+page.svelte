<script>
	export let data;
</script>

<div class="prose prose-headings pb-3">
	<h2>Documents</h2>
</div>
<div class="flex justify-end">
	<button class="btn btn-sm flex justify-end"><a href="/document">New</a></button>
</div>
<div class="overflow-x-auto">
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
			<th><a href="/document/{doc.id}">{doc.title}</a></th>
			<td>{doc.type}</td>
			<td>{doc.ageGroup}</td>
		</tr>
		{/each}
	</table>
</div>