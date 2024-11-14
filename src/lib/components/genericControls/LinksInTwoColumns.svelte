<script lang="ts">
	import LinkField from '$lib/components/genericControls/LinkField.svelte';
	import { type LinkColumnsComponentSchemaType } from '$lib/schemas/LinkColumnsComponentSchema';

	export let linksList: LinkColumnsComponentSchemaType[];
	export let baseUrl: string;

	let halfLength = Math.ceil(linksList.length / 2);
	let firstColumnLinks = linksList.slice(0, halfLength);
	let secondColumnLinks = linksList.slice(halfLength);


</script>

<div>
	<div class="flex flex-wrap -mx-2">
		{#if firstColumnLinks}
			{#each firstColumnLinks as link}
				<div class="w-full md:w-1/2 px-1 space-y-1">
								<span class="block px-4 border border-gray-200 hover:bg-gray-100">
									<LinkField id={link.id} value={link.value} url={encodeURI(`${baseUrl}/${link._key}`)}/>
								</span>
				</div>
			{/each}
		{/if}
		{#if secondColumnLinks}
			{#each secondColumnLinks as link}
				<div class="w-full md:w-1/2 px-1 space-y-1">
								<span class="block px-4 border border-gray-200 hover:bg-gray-100">
									<LinkField id={link.id} value={link.value} url={encodeURI(`${baseUrl}/${link._key}`)}/>
								</span>
				</div>
			{/each}
		{/if}
	</div>
</div>