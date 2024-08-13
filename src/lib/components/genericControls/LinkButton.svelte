<script lang="ts">
	/**
	 * @param icon The Lucide icon component
	 * @param label The button label
	 * @param href The link to navigate to
	 */

	export let icon = null; // This prop will accept any Lucide icon component
	export let label: string;
	export let href: string;
	export let btn_class: string = "btn btn-xs mx-0.5";
</script>

	<button class={btn_class}>
		{#if icon}
			<svelte:component this={icon} class="w-4 h-4" />
		{/if}
		<a href={href}>{label}</a>
	</button>
