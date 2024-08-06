<script lang="ts">
	import { Carta, Markdown } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';
	import 'github-markdown-css/github-markdown.css';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	export let encodedFilename: string;

	const preload = async (url: string) => {
		const resp = await fetch(url);

		if (!resp.ok) {
			throw new Error(`Markdown not found: ${resp.status}`); // Throw an error for non-200 status codes
		}

		const textVal: string = await resp.text();

		return new Promise(function (resolve) {
			resolve(textVal);
		});
	};
</script>

<!--<Markdown {carta} {value} />-->

{#await preload(`/private/fileProxy?filename=${encodedFilename}`)}
	Loading....
{:then value}
	<Markdown {carta} value={String(value)} />
{:catch error}
	<p >Error loading the markdown file: {error}</p>
{/await}