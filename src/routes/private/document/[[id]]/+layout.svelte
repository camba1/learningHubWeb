<script lang="ts">
	// import type { PageData } from './$types.js';
	import ChatUI from '$lib/components/chat/ChatUI.svelte';
	import { page } from '$app/stores';
	// export let data: PageData;

	const searchPageUrl: string = "/";
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Clear", "backLbl": "Back", "confirmationDelMsg": "Clear our chat history? "};


	// let showChat = true;

// function toggleChat() {
// 	showChat = !showChat;
// }
</script>

<div class="flex flex-col h-screen">
	<div class="flex flex-1 overflow-hidden">
		<main class="flex-1 overflow-y-auto">
			<slot />
		</main>

		<div class="w-1/5 bg-base-200">
		<!-- Chat Interface -->
			<ChatUI {searchPageUrl} {btnLabels} />
		</div>

	</div>
</div>
