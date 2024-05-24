<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
	import "../app.css";
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">LearningHub</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
			</li>
			<li>
				<SignedOut>
					<a href="/sign-in">Sign in</a>
					<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
				</SignedOut>
			</li>
			<li>
				<SignedOut>
					<a href="/sign-up">Sign up</a>
					<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
				</SignedOut>
			</li>
			<li>
				<details>
					<summary>
						Menu
					</summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						<li><a href="/documents">Books</a></li>
						<li><a href="/upload">Authors</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>

<slot />