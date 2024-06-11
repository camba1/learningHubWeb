<script lang="ts">
  import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
  import { InternalURLs } from '$lib/utils/urls';
</script>

<!--<div id="signin">-->
<!--  <SignIn redirectUrl="/admin" />-->
<!--</div>-->

<main class="flex items-center h-[calc(80vh-15px)]">
  <div id="signin" class="w-full sm:w-1/2 mx-auto">
    <SignIn redirectUrl={InternalURLs.documents} />
  </div>
</main>