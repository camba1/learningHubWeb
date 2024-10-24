<script lang="ts">
	/**
	 * @param value The current value of the input field.
	 * @param id The unique identifier for the input field.
	 * @param errors An array of error messages to be displayed below the input field. If errors are present, an invalid state will be indicated and the errors will be shown.
	 * @param constraints An object representing the validation constraints for the input field.
	 * @param readOnly Whether the input field should be read-only.
	 */

	import type { InputConstraint } from 'sveltekit-superforms';
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';

	export let value: string;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
	export let id: string;
	export let readOnly: boolean = false;

	const dispatch = createEventDispatcher();

</script>

<!--
@component
A SvelteKit component representing an input field with an embedded button for a form.
-->

	<label class="items-center input input-bordered p-1.5 mx-0.5" >
		<input
			name={id}
			id={id}
			aria-invalid={errors ? 'true' : undefined}
			bind:value={value}
			{...constraints}
			class="grow input input-sm w-full max-w-xs "
			readonly={readOnly}
		/>
		{#if errors}<span class="invalid">{errors}</span>{/if}
		<button class="btn btn-xs btn-circle ml-2" type="button" on:click={() => dispatch('removeItemOnce', value)  }>
			<X  class="w-3 h-3" />
		</button>
	</label>