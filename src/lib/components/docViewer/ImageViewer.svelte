<script lang="ts">

	import { InternalURLs } from '$lib/utils/urls';

	export let encodedFilename: string ;
	export let alt: string = '';
	export let file_category: string = 'document';
	export let img_class: string = "h-auto max-w-full"
	export let encodedParentFilename: string = '';

	let url = `${InternalURLs.fileProxy}?filename=${encodedFilename}&file_category=${file_category}`
	if (encodedParentFilename) {
		url =`${url}&parent_filename=${encodedParentFilename}`
	}
	console.log(url);
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

{#await preload(url)}
	Loading....
{:then objUrl}
	<img src="{String(objUrl)}" alt={alt} class={img_class}/>
{:catch error}
	<span>No Image<br>available</span>
{/await}