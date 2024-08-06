<script lang="ts">

	/**
	 * @param value he current value of the select field.
	 * @param id The unique identifier for the select field.
	 * @param label  The text to be displayed as the label for the select field. If provided, a label element will be rendered.
	 * @param errors An array of error messages to be displayed below the select field. If errors are present, an invalid state will be indicated and the errors will be shown.
	 * @param constraints An object representing the validation constraints for the input field.
	 * @param optionValues An array of strings representing the values for the select field's options.
	 */

	import type { InputConstraint } from 'sveltekit-superforms';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';

	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
	export let id: string
	export let optionValues: string []
</script>

<!--
@component
A SvelteKit component representing a select field for a form.
-->

<span>
	{#if label}<FieldLabel id={id} label={label}/>{/if}
		<select
			name={id}
			id={id}
			aria-invalid={errors ? 'true' : undefined}
			bind:value={value}
			{...constraints}
			class="select select-bordered w-full max-w-xs select-sm">
			<option disabled selected>Types</option>
			{#each optionValues as optionValue}
				<option>{optionValue}</option>
			{/each}
		</select>
	{#if errors}<span class="invalid">{errors}</span>{/if}
</span>