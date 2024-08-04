<script lang="ts">
	export let encodedFilename: string;
</script>

<iframe
	src={`/private/fileProxy?filename=${encodedFilename}`}
	width=100% height="100%"
	title="PDF Viewer">
</iframe>
