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
					Enhancing Children's Literacy Worldwide
				</h1>
				<p class="text-xl mb-8 mr-3">
					Discover the magic of books with Bolbeck Learning, the cutting-edge <b>AI</b> platform
					from Bolbeck LLC that simplifies the distribution of children's books.
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
			<BasicCard title="Book upload" description="Upload PDF and MS Word versions of your books easily to our platform."/>
			<BasicCard title="Track book information with ease" description="Build a library of your books. Automatically create book summaries and main character lists"/>
			<BasicCard title="Translation" description="Translate books to multiple languages, making them accessible to readers around the world."/>
			<BasicCard title="Audio" description="Create audio versions of the books for listening on the go or in the car."/>
			<BasicCard title="Chat with your books" description="Easily search your books for important bits of information and ask questions."/>
			<BasicCard title="Bring characters to life" description="Generate images for your books and your protagonists"/>
		</div>

		<div class="flex flex-wrap items-center mt-12">
			<div class="w-full md:w-1/2">
				<h3 class="text-2xl font-semibold mb-4">Let's Make Learning Exciting and Accessible</h3>
				<p class="text-lg mb-8 mr-3">
					Bolbeck Learning is a comprehensive platform that not only makes books accessible
					but also brings them to life through audio, translation, and interactive chat.
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

