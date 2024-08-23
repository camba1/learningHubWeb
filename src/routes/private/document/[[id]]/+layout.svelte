<script lang="ts">
	import ChatUI from '$lib/components/chat/ChatUI.svelte';
	import curDocInfo from '$lib/stores/curDocInfo';
	import { InternalURLs } from '$lib/utils/urls';

	const searchPageUrl: string = InternalURLs.documents;
	const btnLabels = {"submitLbl": "Submit", "clearLbl": "Clear", "backLbl": "Back"};


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
			<ChatUI {searchPageUrl} {btnLabels} additionalLLMContext={$curDocInfo}/>
		</div>

	</div>
</div>
