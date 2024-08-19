<script lang="ts">
	/**
	 * @param isInitialValueVisible Whether the initial or alternate value is visible.
	 * @param initialLbl The label for the initial state.
	 * @param alternateLbl The label for the alternate state.
	 * @param btn_additional_class Additional class applied to the button (if any).
	 */

	import { PanelRightOpen, PanelRightClose} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let isInitialValueVisible: boolean;
	export let initialLbl: string;
	export let alternateLbl: string;
	export let btn_additional_class: string = "";

	const dispatch = createEventDispatcher();

	function toggleValue() {
		dispatch('toggleValue');
	}

</script>

<!--
@component
A SvelteKit component representing a toggle button that switches between displaying an initial
label with a "PanelRightOpen" icon and an alternate label with a "PanelRightClose" icon based
on the isInitialValueVisible prop. Clicking the button dispatches a toggleValue event to the parent
to toggle the visibility state.
-->

<div class="px-3 mt-4">
	<button class="btn btn-xs {btn_additional_class}" on:click={toggleValue}>
		{#if isInitialValueVisible}
			<PanelRightOpen class="w-4 h-4"/> {initialLbl}
		{:else}
			<PanelRightClose class="w-4 h-4"/> {alternateLbl}
		{/if}
	</button>
</div>