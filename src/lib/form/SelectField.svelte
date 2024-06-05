<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import FieldLabel from '$lib/form/FieldLabel.svelte';

	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
	export let id: string
	export let optionValues: string []
</script>

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