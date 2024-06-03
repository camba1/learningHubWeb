<script context="module" lang="ts">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	export let src: string;
	export let title: string;
	export let artist: string;
	export let audioType: string = "audio/mpeg"

	let paused: boolean  = true;

</script>

<!--		<button class="btn btn-circle btn-outline" on:click={() => paused = !paused}>-->
<!--			<img alt="play/pause button" src={paused ? payImg : pauseImg}>-->
<!--		</button>-->

<div>
		<strong>{title}</strong> /
		<span>{artist}</span>
</div>
		<audio controls class="mt-2 w-full"
					 bind:paused
					 on:play={(e) => {
						const audio = e.currentTarget;

						if (audio !== current) {
							current?.pause();
							current = audio;
						}
					}}
		>
			<source src={src} type={audioType}/>
			Your browser does not support the audio element.
		</audio>