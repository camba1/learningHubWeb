<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Image } from 'lucide-svelte';
	import { Headphones, CircleArrowLeft } from 'lucide-svelte';
	import ImageViewer from '$lib/components/docViewer/ImageViewer.svelte';
	import VideoPlayer from '$lib/components/docViewer/VideoPlayer.svelte';
	import AudioFilesROViewer from '$lib/components/pageViewer/AudioFilesROViewer.svelte';
	import LinkButton from '$lib/components/genericControls/LinkButton.svelte';
	import { page } from '$app/stores';
	import { InternalURLs } from '$lib/utils/urls.js';
	import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
	import type { DocumentImageSchemaType } from '$lib/schemas/documentImages';
	import curDocInfo from '$lib/stores/curDocInfo';

	// export let data: PageData;
	export let availableFiles: PageSchemaType[]
	export let availableImages: DocumentImageSchemaType[]
	export let editable: boolean
	export let parentFilename: string
	export let filename: string
	export let docDetail_key: string
	// export let number_of_pages: number

	let currentPageNumber = 0;
	let currentPage: PageSchemaType = availableFiles[currentPageNumber];
	let currentImage: DocumentImageSchemaType | undefined = availableImages[currentPageNumber];
	let image_file_category: string = "document";

	let imageKey = currentImage?.imageFilename || 'initial';

	// Video player state
	let videoElement: HTMLVideoElement | null = null;
	let isAnimationPlaying = false;

	$curDocInfo = {filename: filename || "", docDetail_key: docDetail_key};

	function set_image_file_type() {
		image_file_category = "document_image";
		if (currentPageNumber === 0) {
			image_file_category = "document";
		}
	}

	function changeCurrentFileIndex(event: CustomEvent<{ index: number }>) {
		currentPageNumber = event.detail.index;
		currentPage = availableFiles[currentPageNumber];
		currentImage = availableImages.find(image => image.pageNumber === currentPage.number);
		set_image_file_type();
		imageKey = currentImage?.imageFilename || 'changed';
		// Reset videoElement when switching to an image
		if (!currentImage?.animationFilename) {
			videoElement = null;
		}
	}

	// Video control functions
	function toggleVideoPlayPause() {
		if (videoElement) {
			if (isAnimationPlaying) {
				videoElement.pause();
			} else {
				videoElement.play();
			}
			isAnimationPlaying = !isAnimationPlaying;
		}
	}

	function handleVideoEnded() {
		isAnimationPlaying = false; // Reset the play/pause state
	}

	// Ensure the event listener is added when the video element is available
	$: if (videoElement) {
		videoElement.addEventListener('ended', handleVideoEnded);

		// Cleanup the event listener when the component is destroyed
		onDestroy(() => {
			if (videoElement) {
				videoElement.removeEventListener('ended', handleVideoEnded);
			}
		});
	}

	// function restartVideo() {
	// 	if (videoElement) {
	// 		videoElement.currentTime = 0;
	// 		videoElement.play();
	// 		isPlaying = true;
	// 	}
	// }

</script>

<div class="w-full h-full flex flex-col p-10 relative">
	{#if !availableFiles}
		<p class="text-center text-error p-4">No data found...</p>
	{:else}
		{#if !editable}
			<div class="absolute top-0 right-0 mt-2 mr-2 z-10">
				<LinkButton label="X" href="{InternalURLs.viewer}" btn_additional_class="btn-outline btn-success"/>
			</div>
		{/if}

		<div class="flex-1 flex flex-col overflow-hidden">
			<div class="card w-full h-full flex flex-col shadow-xl overflow-hidden card-bordered border-gray-200">
				<figure class="px-2 pt-4 pb-1 h-[63%] min-h-0">
					{#if currentImage && currentImage.imageFilename}
						{#key imageKey}
							<div in:fade={{ duration: 300 }} class="w-full h-full">

								{#if currentImage.animationFilename}
										<VideoPlayer
											encodedFilename={currentImage.animationFilename}
											encodedParentFilename={parentFilename}
											bind:videoElement
											controls={false}
											videoClass="rounded-xl w-full h-full object-contain"
										/>
								{:else}
									<ImageViewer
										encodedFilename={currentImage.imageFilename}
										file_category={image_file_category}
										encodedParentFilename={parentFilename}
										alt="Image generated for page {currentPage.number}"
										img_class="rounded-xl w-full h-full object-contain"
									/>
								{/if}
							</div>
						{/key}
					{:else}
						<div class="text-center text-neutral-content flex items-center justify-center w-full h-full">
							No Image available
						</div>
					{/if}
				</figure>

				<div class="card-body flex-1 overflow-auto p-2 pt-2">
					<div class="flex flex-col items-center">
						{#if editable}
							<div class="flex flex-row items-center justify-center space-x-4">
								<LinkButton label="Edit Audio" icon={Headphones} href={encodeURI(`${InternalURLs.document}/${$page.params.id}/document_audio/${parentFilename}/${$page.params.detail_id}?page=${currentPage.number}`)} />
								<LinkButton label="Edit Image" icon={Image}
														href={encodeURI(`${InternalURLs.document}/${$page.params.id}/document_image/${parentFilename}/${currentImage?._key ?? ''}?detail=${docDetail_key}`)}
														disabled={!currentImage?._key}/>
								<LinkButton label="Back" icon={CircleArrowLeft} href={encodeURI(`${InternalURLs.document}/${$page.params.id}/document_detail/${parentFilename}/${$page.params.detail_id}`)} />
							</div>
						{/if}
						<div class="w-full flex-1">
							{#if availableFiles}
								<AudioFilesROViewer
									availableFiles={availableFiles}
									animationFilename={currentImage?.animationFilename}
									isAnimationPlaying={isAnimationPlaying}
									label="Jump to Page:"
									on:playAnimation={() => toggleVideoPlayPause()}
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
