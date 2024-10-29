<script lang="ts">
	/**
	 * @param value The current value of the input field.
	 * @param id The unique identifier for the input field.
	 * @param label The text to be displayed as the label for the input field. If provided, a label element will be rendered.
	 * @param url The url to be navigated to when the link is clicked.
	 */

	import FieldLabel from '$lib/components/form/FieldLabel.svelte';

	export let value: string | undefined;
	export let label: string | undefined = undefined;
	export let id: string;
	export let url: string;
</script>

<!--
@component
A SvelteKit component representing an link field
-->

<span>
	{#if label}<FieldLabel id={id} label={label}/>{/if}
	<a id={id} href={url} class="link link-primary input-sm"> {value} </a>
</span>