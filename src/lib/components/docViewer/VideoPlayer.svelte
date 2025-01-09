<script lang="ts">
	import { InternalURLs } from '$lib/utils/urls';

	export let encodedFilename: string;
	export let file_category: string = 'document_animation';
	export let encodedParentFilename: string = '';

	$: url = `${InternalURLs.fileProxy}?filename=${encodedFilename}&file_category=${file_category}`;
	$: if (encodedParentFilename) {
		url = `${url}&parent_filename=${encodedParentFilename}`;
	}

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
			throw new Error(`Video not found: ${resp.status}`);
		}

		const blob = await resp.blob();

		return new Promise<string>(function (resolve) {
			let objUrl = URL.createObjectURL(blob);
			resolve(objUrl);
		});
	};
</script>

{#if error}
	<span>No video<br>available</span>
{:else if objUrl}
	<video controls class="w-full h-auto">
		<source src={objUrl} type="video/mp4">
		<track kind="captions" src="" label="English" srclang="en" default />
		Your browser does not support the video tag.
	</video>
	<div class="text-xs italic text-gray-500 mt-1">
		This animation has no audio.
	</div>
{:else}
	Loading....
{/if}
