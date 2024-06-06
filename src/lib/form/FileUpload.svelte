<script lang="ts">
	/**
	 * @param id The id of the file input
	 * @param form The form data from superForms
	 * @param errors An array of error messages to be displayed below the textarea field. If errors are present, an invalid state will be indicated and the errors will be shown.
	 */
	import { fileProxy } from 'sveltekit-superforms';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let form: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let errors: any;

	export let id: string;

	const file = fileProxy(form, 'file');
</script>

<!--
@component
A SvelteKit component representing a file upload field.
-->

<div>
	<input
		name={id}
		id={id}
		type="file"
		accept="application/pdf, .docx, .pdf, md, .markdown"
		bind:files={$file}
		class="file-input file-input-bordered file-input-sm w-full max-w-xs" />
	{#if $errors.file}<span>{$errors.file}</span>{/if}
</div>
