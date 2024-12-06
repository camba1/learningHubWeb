<script lang="ts">
	/**
	 * @param value The current value of the textarea field.
	 * @param id The unique identifier for the textarea field.
	 * @param label The text to be displayed as the label for the textarea field. If provided, a label element will be rendered.
	 * @param errors An array of error messages to be displayed below the textarea field. If errors are present, an invalid state will be indicated and the errors will be shown.
	 * @param constraints An object representing the validation constraints for the textarea field.
	 * @param readOnly Whether the textarea field should be read-only.
	 * @param rows The number of rows in the textarea field.
	 */

	import type { InputConstraint } from 'sveltekit-superforms';
	import FieldLabel from '$lib/components/form/FieldLabel.svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
	export let id: string
	export let readOnly: boolean = false;
	export let rows: number = 5;
	export let placeholder: string = "";

	const dispatch = createEventDispatcher();


	function isCtrlEnterKeysPressed(event: KeyboardEvent) {
		return event.ctrlKey && event.key === 'Enter';
	}

	function submitKeyPress(event: KeyboardEvent) {
		if (isCtrlEnterKeysPressed(event)) {
			event.preventDefault();
			dispatch('submitKeyPress');
		}
	}

</script>

<!--
@component
A SvelteKit component representing a textarea field for a form. If the user clicks control + enter,
a submitKeyPress event will be dispatched to the parent component.
-->

<span>
	{#if label}<FieldLabel id={id} label={label}/>{/if}
		<textarea
			name={id}
			id={id}
			aria-invalid={errors ? 'true' : undefined}
			bind:value={value}
			{...constraints}
			class="textarea textarea-bordered resize w-full"
			rows={rows}
			readonly={readOnly}
			on:keypress={submitKeyPress}
			placeholder={placeholder}
		/>
	{#if errors}<span class="invalid">{errors}</span>{/if}
</span>