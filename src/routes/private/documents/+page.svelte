<script lang="ts">

	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';


	import { SquarePlus } from 'lucide-svelte';
	import { FilePlus } from 'lucide-svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';
	import { InternalURLs } from '$lib/utils/urls';
	import { DocumentTypeEnum, DocumentAgeGroupEnum } from '$lib/schemas/documents';
	import FormSearchButtons from '$lib/components/form/FormSearchButtons.svelte';
	import TextField from '$lib/components/form/TextField.svelte';
	import SelectField from '$lib/components/form/SelectField.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';
	import FormPaginationButtons from '$lib/components/form/FormPaginationButtons.svelte';
	import FormToggleButtonDispatch from '$lib/components/form/FormToggleButtonDispatch.svelte';
	import { sortOrderEnum } from '$lib/schemas/genericSearchParams';

	export let data: PageData;

	const { form, errors, constraints, delayed, message } = superForm(data.form, {
		resetForm: false
	});

	let isSidebarVisible: boolean = true;

	// Function to toggle sidebar visibility
	function toggleSidebar() {
		isSidebarVisible = !isSidebarVisible;
	}

</script>

<SubmitToast message={$message} page_status={$page.status}/>


<div class="flex h-screen overflow-hidden">
	<!-- Sidebar -->
	{#if isSidebarVisible}
		<div id="search-drawer" class="w-64 flex-shrink-0 bg-base-200 p-4 border-r-2 overflow-y-auto">
			<h2 class="text-xl font-bold mb-4">Search</h2>
			<form method="GET" >
				<input type="hidden" id="skip" name="skip" bind:value={$form.skip} />
				<input type="hidden" id="limit" name="limit" bind:value={$form.limit} />
				<TextField label="Title" id="title" bind:value={$form.title}
									 errors={$errors.title} constraints={$constraints.title} />
				<SelectField label="Type" id="type" bind:value={$form.type}
										 errors={$errors.type} constraints={$constraints.type}
										 optionValues={DocumentTypeEnum.options} />
				<SelectField label="Age Group" id="ageGroup" bind:value={$form.ageGroup}
										 errors={$errors.ageGroup} constraints={$constraints.ageGroup}
										 optionValues={DocumentAgeGroupEnum.options} />
				<SelectField label="Sort By" id="sort_by" bind:value={$form.sort_by}
										 errors={$errors.sort_by} constraints={$constraints.sort_by}
										 optionValues={data.sortByEnum} />
				<SelectField label="Sort order" id="sort_order" bind:value={$form.sort_order}
										 errors={$errors.sort_order} constraints={$constraints.sort_order}
										 optionValues={sortOrderEnum.options} />
				<FormSearchButtons submitLbl="Search" clearLbl="Clear" delayed={$delayed} reloadHref={InternalURLs.documents} />

			</form>
		</div>
	{/if}
	<!-- Main content -->
	<div class="flex-1 overflow-y-auto p-4">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-bold">Documents</h2>
			<div>
				<LinkButton icon={SquarePlus} label="New" href={InternalURLs.document} btn_additional_class="btn-primary btn-outline"/>
				<LinkButton icon={FilePlus} label="New from file" href={InternalURLs.fileUpload} btn_additional_class="btn-primary btn-outline" />
			</div>
		</div>
		<div class="overflow-x-auto">
			<table class="table table-sm table-pin-rows table-pin-cols">
				<thead>
				<tr>
					<th>Title</th>
					<td>Type</td>
					<td>Age Group</td>
				</tr>
				</thead>
				<tbody>
				{#each data.documents as doc}
					<tr>
						<th><a href="{InternalURLs.document}/{doc._key}">{doc.title}</a></th>
						<td>{doc.type}</td>
						<td>{doc.ageGroup}</td>
					</tr>
				{/each}
			</table>
		</div>
		<div class="flex justify-between  mb-4">
			<!-- Toggle Sidebar Button -->
			<FormToggleButtonDispatch isInitialValueVisible={isSidebarVisible} on:toggleValue={toggleSidebar} initialLbl="Hide filters" alternateLbl="Show filters"/>

			<!-- Pagination -->
			<FormPaginationButtons previousLbl="Previous" nextLbl="Next" delayed={$delayed} />
		</div>
	</div>

</div>