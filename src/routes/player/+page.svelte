<script lang="ts">
	import type { PageData } from './$types.js';
	import AudioPlayer from '$lib/audioPlayer/AudioPlayer.svelte';

	export let data: PageData;

</script>

<div class="centered">
	<div role="tablist" class="tabs tabs-lifted">
		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 1"  />
		<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
			BLAHH
		</div>

		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 2" checked />
		<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
				<div class="p-4">
					<ul class="list-disc pl-5">
						{#if data.docVoices}
							{#each data.docVoices  as audio}
								<ul class="my-2">
									<AudioPlayer src={"/audio/".concat(audio.id.toString()) } title={"Page: " + audio.documentPageNumber} artist={"Voice: " + audio.voiceName} />
								</ul>
							{/each}
							{/if}
					</ul>
				</div>
		</div>
</div>
	<!--<button on:click={stopAll}>-->
	<!--	stop all-->
	<!--</button>-->

</div>


<style>
    .centered {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        gap: 0.5em;
        max-width: 40em;
        margin: 0 auto;
    }
</style>