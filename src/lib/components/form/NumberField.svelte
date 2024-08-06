<script lang="ts">
	/**
	 * @param value The current value of the input field.
	 * @param id The unique identifier for the input field.
	 * @param label The text to be displayed as the label for the input field. If provided, a label element will be rendered.
	 * @param errors An array of error messages to be displayed below the input field. If errors are present, an invalid state will be indicated and the errors will be shown.
	 * @param constraints An object representing the validation constraints for the input field.
	 * @param readOnly Whether the input field should be read-only.
	 */

	import type { InputConstraint } from 'sveltekit-superforms';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
	export let id: string;
	export let readOnly: boolean = false;
</script>

<!--
@component
A SvelteKit component representing an input field for a form.
-->

<span>
	{#if label}<FieldLabel id={id} label={label}/>{/if}
	<input
		name={id}
		id={id}
		type="number"
		aria-invalid={errors ? 'true' : undefined}
		bind:value={value}
		{...constraints}
		class="input input-bordered input-sm w-full max-w-xs"
		readonly={readOnly}
	/>
	{#if errors}<span class="invalid">{errors}</span>{/if}
</span>