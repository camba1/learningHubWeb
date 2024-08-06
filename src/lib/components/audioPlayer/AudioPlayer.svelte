<script context="module" lang="ts">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	export let src: string;
	export let title: string;
	export let artist: string;
	export let audioType: string = "audio/mpeg"

	let paused: boolean  = true;
	let srcUrl = '';
	let player;

	$: srcUrl = `/private/fileProxy?filename=${encodeURIComponent(src)}`;
	$: reload(srcUrl)

	const reload = () => {
		if(!player) return
		player.load()
		// if(play) player.play()
	}

</script>

<!--		<button class="btn btn-circle btn-outline" on:click={() => paused = !paused}>-->
<!--			<img alt="play/pause button" src={paused ? payImg : pauseImg}>-->
<!--		</button>-->

<div>
		<strong>{title}</strong> /
		<span>{artist}</span>
</div>
		<audio bind:this={player} controls class="mt-2 w-full"
					 bind:paused
					 on:play={(e) => {
						const audio = e.currentTarget;

						if (audio !== current) {
							current?.pause();
							current = audio;
						}
					}}
		>
			<source src={srcUrl} type={audioType}/>
			Your browser does not support the audio element.
		</audio>