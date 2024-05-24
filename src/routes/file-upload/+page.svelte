<script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { FileSchema } from '$lib/fileUpload'
	import { page } from '$app/stores';

	export let data;

	const { form, enhance, errors, message } = superForm(data.form, {
		validators: zodClient(FileSchema)
	})

	const file = fileProxy(form, 'file')
</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<form method="POST" enctype="multipart/form-data" use:enhance>
<!--	<input-->
<!--		type="file"-->
<!--		name="file"-->
<!--		accept="application/pdf, .docx, .pdf, md, .markdown"-->
<!--		bind:files={$file}-->
<!--	/>-->
	<div>
		<input name="file"
					 id="file"
					 type="file"
					 accept="application/pdf, .docx, .pdf, md, .markdown"
					 bind:files={$file}
					 class="file-input file-input-bordered file-input-sm w-full max-w-xs" />
		{#if $errors.file}<span>{$errors.file}</span>{/if}
	</div>
	<button name="submit" id="submit" class="btn">Submit</button>
</form>