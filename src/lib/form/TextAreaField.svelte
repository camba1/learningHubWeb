<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import FieldLabel from '$lib/form/FieldLabel.svelte';

	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
	export let id: string
</script>

<span>
	{#if label}<FieldLabel id={id} label={label}/>{/if}
		<textarea
			name={id}
			id={id}
			aria-invalid={errors ? 'true' : undefined}
			bind:value={value}
			{...constraints}
			class="textarea textarea-bordered resize w-full"
		/>
	{#if errors}<span class="invalid">{errors}</span>{/if}
</span>