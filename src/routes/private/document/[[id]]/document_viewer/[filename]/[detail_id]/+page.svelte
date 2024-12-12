<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { Image } from 'lucide-svelte';
	import { Headphones, CircleArrowLeft } from 'lucide-svelte';
	import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
	import type { DocumentImageSchemaType } from '$lib/schemas/documentImages';
	import ImageViewer from '$lib/components/docViewer/ImageViewer.svelte';
	import AudioFilesROViewer from '$lib/components/pageViewer/AudioFilesROViewer.svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';
	import { InternalURLs } from '$lib/utils/urls.js';

	export let data: PageData;

	let currentPageNumber = 0;
	let currentPage: PageSchemaType = data.availableFiles[currentPageNumber];
	let currentImage: DocumentImageSchemaType | undefined = data.availableImages[currentPageNumber];
	let image_file_category: string = "document";

	// Key for forcing transition
	let imageKey = currentImage?.imageFilename || 'initial';


	function set_image_file_type(){
		image_file_category = "document_image";
		if (currentPageNumber === 0) {
			image_file_category = "document";
		}
	}

	function changeCurrentFileIndex(event: CustomEvent<{ index: number }>) {
		currentPageNumber = event.detail.index;
		currentPage = data.availableFiles[currentPageNumber];
		currentImage = data.availableImages.find(image => image.pageNumber === currentPage.number);
		set_image_file_type();
		// Update keys to trigger transitions
		imageKey = currentImage?.imageFilename || 'changed';
	}

</script>

<div class="w-full h-full flex flex-col p-10">
	{#if !data.availableFiles}
		<p class="text-center text-error p-4">No data found...</p>
	{:else}
		<div class="flex-1 flex flex-col overflow-hidden">
			<div class="card w-full h-full flex flex-col  shadow-xl overflow-hidden card-bordered border-gray-200">
				<!-- Image at the top of the card (fixed height) -->
				<figure class="px-4 pt-4 h-[60%] min-h-0">
					{#if currentImage && currentImage.imageFilename}
						{#key imageKey}
							<div in:fade="{{ duration: 300}}"  class="w-full h-full">
								<ImageViewer
									encodedFilename={currentImage.imageFilename}
									file_category={image_file_category}
									encodedParentFilename={data.parentFilename}
									alt="Image generated for page {currentPage.number}"
									img_class="rounded-xl w-full h-full object-contain"
								/>
							</div>
						{/key}
					{:else}
						<div class="text-center text-neutral-content flex items-center justify-center w-full h-full">
							No Image available
						</div>
					{/if}
				</figure>

				<!-- Content at the bottom of the card (flexible height) -->
				<div class="card-body flex-1 overflow-auto p-4 pt-2">
					<div class="flex flex-col items-center">
						<!-- Conditional Edit Button -->
						{#if data.editable}
							<div class="flex flex-row items-center justify-center space-x-4">
								<LinkButton label="Edit Audio" icon={Headphones} href={encodeURI(`${InternalURLs.document}/${$page.params.id}/document_detail/${data.parentFilename}/${$page.params.detail_id}`)}  />
								<LinkButton label="Edit Image" icon={Image} href={encodeURI(`${InternalURLs.document}/${$page.params.id}/document_image/${data.parentFilename}/${currentImage?._key ?? ''}`)} />
								<LinkButton label="Back" icon={CircleArrowLeft} href={encodeURI(`${InternalURLs.document}/${$page.params.id}/document_detail/${data.parentFilename}/${$page.params.detail_id}`)} />
							</div>
						{/if}
						<div class="w-full flex-1">
							{#if data.availableFiles}
								<AudioFilesROViewer
									availableFiles={data.availableFiles}
									label="Jump to Page:"
									on:fileIndexChange={changeCurrentFileIndex}
								/>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
