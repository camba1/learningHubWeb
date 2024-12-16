<!--<script lang="ts">-->
<!--	/**-->
<!--	 * @param icon The Lucide icon component-->
<!--	 * @param label The button label-->
<!--	 * @param href The link to navigate to when the button is clicked-->
<!--	 * @param btn_class The button class. Default: "btn btn-xs mx-0.5"-->
<!--	 */-->

<!--	import type { ComponentType } from 'svelte';-->
<!--	export let icon: ComponentType | null = null;-->
<!--	export let label: string = "";-->
<!--	export let href: string;-->
<!--	export let btn_additional_class: string = "";-->

<!--</script>-->

<!--	<button class="btn btn-xs mx-0.5 {btn_additional_class}">-->
<!--		{#if label}-->
<!--			<a href={href}>-->
<!--				{#if icon}-->
<!--					<svelte:component this={icon} class="w-4 h-4" />-->
<!--				{/if}-->
<!--				{label}-->
<!--			</a>-->
<!--		{:else if icon}-->
<!--			<a href={href}><svelte:component this={icon} class="w-4 h-4" /></a>-->
<!--		{:else}-->
<!--			<a href={href}>I need a label</a>-->
<!--		{/if}-->
<!--	</button>-->


<script lang="ts">
	/**
	 * @param icon The Lucide icon component
	 * @param label The button label
	 * @param href The link to navigate to when the button is clicked
	 * @param btn_class The button class. Default: "btn btn-xs mx-0.5"
	 */

	import type { ComponentType } from 'svelte';
	export let icon: ComponentType | null = null;
	export let label: string = "";
	export let href: string;
	export let btn_additional_class: string = "";
</script>

<button class="btn btn-xs mx-0.5 {btn_additional_class}">
	<a href={href} class="flex items-center space-x-1">
		{#if icon}
			<svelte:component this={icon} class="w-4 h-4" />
		{/if}
		{#if label}
			<span>{label}</span>
		{:else if icon}
			<span>I need a label</span>
		{/if}
	</a>
</button>
