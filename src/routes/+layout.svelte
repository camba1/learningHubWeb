<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import "../app.css";
	import { InternalURLs } from '$lib/utils/urls';
	import { writable } from 'svelte/store';

	// let menuDetails: HTMLDetailsElement;
	let isOpen = writable(false);

	function handleItemClick() {
		isOpen.set(false);
	}
</script>

<div class="navbar bg-base-200 sticky top-0 z-10">
	<div class="flex-1">
		<a href={InternalURLs.home} class="btn btn-ghost text-xl">Bolbeck Learning</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href={InternalURLs.about}>About</a></li>
			<SignedOut>
				<li>
					<a href={InternalURLs.signIn}>Sign in</a>
				</li>
				<li>
					<a href={InternalURLs.signUp}>Sign up</a>
				</li>
			</SignedOut>
			<SignedIn>
				<li id="menu">
					<details id="menuDetails" bind:open={$isOpen}>
						<summary>
							Menu
						</summary>
						<ul class="p-2 bg-base-100 rounded-t-none">
							<li><a href={InternalURLs.documents} on:click={handleItemClick}>Books</a></li>
							<li><a href={InternalURLs.fileUpload} on:click={handleItemClick}>Upload</a></li>
							<li><a href={InternalURLs.chat} on:click={handleItemClick}>Chat</a></li>
						</ul>
					</details>
				</li>
				<li>
					<UserButton afterSignOutUrl={InternalURLs.home} />
				</li>
			</SignedIn>
		</ul>
	</div>
</div>

<slot />
