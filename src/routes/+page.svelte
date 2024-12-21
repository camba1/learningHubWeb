<script lang="ts">
	import MainFooter from '$lib/components/genericControls/MainFooter.svelte';
	import BasicCard from '$lib/components/genericControls/BasicCard.svelte';
</script>
<div>
<main>
	<section id="hero" class="container mx-auto pt-24">
		<div class="flex flex-wrap items-center">
			<div class="w-full md:w-1/2">
				<h1 class="text-5xl font-bold mb-4">
					Bring your children's books to life
				</h1>
				<p class="text-xl mb-8 mt-3 mr-3">
					Uncover the magic of books with Bolbeck Imagine, the cutting-edge <b>AI</b> platform
					that enhances and simplifies the creation and distribution of children's books. <br> <br>
					Make children worldwide fall in love with reading all over again!
				</p>
				<a href="/sign-up" class="btn btn-primary">Get Started</a>
			</div>
			<div class="w-full md:w-1/2">
				<img
					src="/images/magicBookShelve.jpg"
					class="rounded-lg shadow-lg w-full"
					alt="Kids having fun reading around a bookshelf"
				/>
			</div>
		</div>
	</section>

	<section id="features" class="container mx-auto pt-24">
		<h2 class="text-3xl font-bold mb-8">Features</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<BasicCard title="Track information with ease" description="Upload your books to automatically extract relevant information about its plot and protagonists"/>
			<BasicCard title="Translate" description="Experience your books in multiple languages & make them accessible to readers around the world."/>
			<BasicCard title="Listen" description="Create audio versions of the books for listening on the go or in the car."/>
			<BasicCard title="Chat with your books" description="Find what you need in a flash by chatting with your book questions with ease"/>
			<BasicCard title="Bring characters to life" description="Generate images to make your books and protagonists come alive"/>
			<BasicCard title="Enjoy your books" description="Create an experience that allows children to have fun reading again"/>
		</div>

		<div class="flex flex-wrap items-center mt-12">
			<div class="w-full md:w-1/2">
				<h3 class="text-2xl font-semibold mb-4">Let's make reading exciting and accessible</h3>
				<p class="text-lg mb-8 mr-3">
					Bolbeck Imagine is a comprehensive platform that not only makes books accessible
					but also brings them to life through audio, translation, and interactive chat.
				</p>
				<p class="text-lg mb-8 mr-3">
					Not a professional writer? No problem! Enjoy time with your kids creating your shared stories. Just upload a document and let Bolbeck Imagine take care of the rest.
				</p>
			</div>
			<div class="w-full md:w-1/2">
				<img
					src="/images/bolbeckLearning3.jpg"
					class="rounded-lg shadow-lg w-full"
					alt="Kids having fun reading with books flying around them"
				/>
			</div>
		</div>
	</section>
	<MainFooter />
</main>
</div>

