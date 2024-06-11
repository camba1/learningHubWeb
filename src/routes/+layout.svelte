<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
	import "../app.css";
	import { InternalURLs } from '$lib/utils/urls';

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
						<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
				</li>
				<li>
						<a href={InternalURLs.signUp}>Sign up</a>
						<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
				</li>
			</SignedOut>
			<SignedIn>
				<li>
					<details>
						<summary>
							Menu
						</summary>
						<ul class="p-2 bg-base-100 rounded-t-none">
							<li><a href={InternalURLs.documents}>Books</a></li>
							<li><a href={InternalURLs.fileUpload}>Upload</a></li>
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