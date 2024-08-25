<script lang="ts">
	import ChatUI from '$lib/components/chat/ChatUI.svelte';
	import curDocInfo from '$lib/stores/curDocInfo';
	import { InternalURLs } from '$lib/utils/urls';
	import { Splitpanes, Pane } from 'svelte-splitpanes';

	const searchPageUrl: string = InternalURLs.documents;
	const btnLabels = {"submitLbl": "Submit", "clearLbl": "Clear", "backLbl": "Back to search"};

</script>

<!--<div class="flex flex-col h-screen">-->
<!--	<div class="flex flex-1 overflow-hidden">-->
<!--		<main class="flex-1 overflow-y-auto">-->
<!--			&lt;!&ndash; Main Body &ndash;&gt;-->
<!--			<slot />-->
<!--		</main>-->

<!--		<div class="w-1/5 bg-base-200">-->
<!--		&lt;!&ndash; Chat Interface &ndash;&gt;-->
<!--			<ChatUI {searchPageUrl} {btnLabels} additionalLLMContext={$curDocInfo}/>-->
<!--		</div>-->

<!--	</div>-->
<!--</div>-->

<div class="flex flex-col ">
	<Splitpanes class="flex flex-1">
		<Pane size="{80}">
			<main class="flex-1 overflow-y-auto bg-white main-body" >
				<!-- Main Body -->
				<slot />
			</main>
		</Pane>
		<Pane size="{20}" maxSize="{50}">
			<!-- Chat Interface -->
			<ChatUI
				{searchPageUrl}
				{btnLabels}
				additionalLLMContext={$curDocInfo}
			/>
		</Pane>
	</Splitpanes>
</div>

<style>
    .main-body {
        height: 90vh; /* Make the wrapper take the full height of the viewport */
    }
</style>