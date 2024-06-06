<script lang="ts">
	/**
	 * @param icon The Lucide icon component
	 * @param label The button label
	 * @param href The link to navigate to
	 */

	export let icon; // This prop will accept any Lucide icon component
	export let label: string;
	export let href: string;
</script>

	<button class={`btn btn-xs mx-0.5`}>
			<svelte:component this={icon} class="w-4 h-4" />
			<a href={href}>{label}</a>
	</button>
