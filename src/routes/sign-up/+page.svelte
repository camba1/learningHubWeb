<script lang="ts">
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
	import { InternalURLs } from '$lib/utils/urls';
</script>

<div class="flex items-center h-[calc(80vh-15px)]">
	<div id="signin" class="w-full sm:w-1/2 mx-auto">
		<SignUp redirectUrl={InternalURLs.documents} />
	</div>
</div>

<!--<main class="flex items-center h-[calc(80vh-15px)]">-->
<!--	<div id="signin" class="w-full sm:w-1/2 mx-auto">-->
<!--		<SignIn redirectUrl="/admin" />-->
<!--	</div>-->
<!--</main>-->