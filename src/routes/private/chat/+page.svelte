<script lang="ts">
	// import type { PageData } from './$types.js';
	import ChatUI from '$lib/components/chat/ChatUI.svelte';

	// export let data: PageData;

	const searchPageUrl: string = "/";
	const btnLabels = {"submitLbl": "Submit", "clearLbl": "Clear", "backLbl": "Back"};
</script>

<ChatUI {searchPageUrl} {btnLabels} />
