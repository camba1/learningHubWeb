<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h3 class="card-title">{title}</h3>
		<p>{description}</p>
	</div>
</div>