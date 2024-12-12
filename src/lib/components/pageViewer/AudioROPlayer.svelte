<script context="module" lang="ts">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { Play, Pause, RotateCcw } from 'lucide-svelte';

	export let src: string;
	export let audioType: string = "audio/mpeg";
	export let disabled: boolean = false;

	let paused: boolean = true;
	let srcUrl = '';
	let player: HTMLAudioElement;

	$: srcUrl = `/private/fileProxy?filename=${encodeURIComponent(src)}`;
	$: reload(srcUrl);

	const reload = () => {
		if (!player) return;
		player.load();
	};

	const togglePlayPause = () => {
		if (player) {
			if (paused) {
				player.play();
			} else {
				player.pause();
			}
			paused = !paused;
		}
	};

	const restartPlayback = () => {
		if (player) {
			player.currentTime = 0; // Reset playback to the beginning
			player.play()
		}
	};
</script>

<audio bind:this={player} class="hidden"
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

<button on:click={togglePlayPause} class="btn btn-circle btn-outline btn-accent btn-sm mx-1" disabled={disabled}>
	{#if paused}
		<Play color="#3e9392" />
	{:else}
		<Pause color="#3e9392" />
	{/if}
</button>

<button class="btn btn-circle btn-outline btn-accent btn-sm mx-1" on:click={restartPlayback} disabled={disabled}>
	<RotateCcw color="#3e9392" />
</button>