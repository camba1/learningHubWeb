<script lang="ts">
	/**
	 * @param id The id of the label
	 * @param label The text of the label
	 */

	export let id: string;
	export let label: string;
</script>

<!--
@component
A SvelteKit component representing a label for a form field.
-->

<label for={id} class="label label-text font-semibold">{label} </label>