<script lang="ts">

	export let encodedFilename: string ;
	export let alt: string = '';
	export let img_class: string = "h-auto max-w-full"

	const preload = async (url: string) => {
		const resp = await fetch(url);

		if (!resp.ok) {
			throw new Error(`Image not found: ${resp.status}`);
		}

		const blob = await resp.blob();

		return new Promise(function (resolve) {
			let objUrl = URL.createObjectURL(blob)
			resolve(objUrl);
		});
	};
</script>

{#await preload(`/private/fileProxy?filename=${encodedFilename}`)}
	Loading....
{:then objUrl}
	<img src="{String(objUrl)}" alt={alt} class={img_class}/>
{:catch error}
	<p >Image has not yet been created for this document</p>
{/await}