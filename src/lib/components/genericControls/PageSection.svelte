<script lang="ts">
	export let label: string;
</script>

<section  class="mt-6">
	<div class="border-b mb-2">
		<h2 class="font-semibold ">{label}</h2>
	</div>
	<div class="ml-10">
		<slot />
	</div>
</section>