<script lang="ts">
	import { InternalURLs } from '$lib/utils/urls';

	export let encodedFilename: string;
	export let alt: string = '';
	export let file_category: string = 'document';
	export let img_class: string = "h-auto max-w-full";
	export let encodedParentFilename: string = '';

	$: url = `${InternalURLs.fileProxy}?filename=${encodedFilename}&file_category=${file_category}`;
	$: if (encodedParentFilename) {
		url = `${url}&parent_filename=${encodedParentFilename}`;
	}

	// let objUrl: string | null | unknown = null;
	let objUrl: string = "";
	let error: Error | null = null;

	$: preload(url).then(
		(newObjUrl) => {
			objUrl = newObjUrl;
			error = null;
		},
		(err) => {
			error = err;
			objUrl = "";
		}
	);

	const preload = async (url: string) => {
		const resp = await fetch(url);

		if (!resp.ok) {
			throw new Error(`Image not found: ${resp.status}`);
		}

		const blob = await resp.blob();

		return new Promise<string>(function (resolve) {
			let objUrl = URL.createObjectURL(blob);
			resolve(objUrl);
		});
	};
</script>

{#if error}
	<span>No Image<br>available</span>
{:else if objUrl}
	<img src={objUrl} alt={alt} class={img_class} />
{:else}
	Loading....
{/if}
