<script lang="ts">
	import MainFooter from '$lib/genericControls/MainFooter.svelte';
</script>

<main>
	<section id="about-us" class="container mx-auto pt-12 section-spacing">
		<h2 class="text-3xl font-bold mb-8">About Us</h2>
		<p>
			At Bolbeck LLC, we believe that every child deserves a chance to explore the wonderful world of literature. That's why we created Bolbeck Learning, a platform powered by the latest AI technology that makes it easy for publishers and authors to distribute their books to kids around the world.
		</p>
		<p>
			Our mission is to provide equal access to literature, no matter the language or location. With Bolbeck Learning, both parents and educators can introduce children to a diverse range of stories and characters, helping them develop a love for reading and learning.
		</p>
	</section>

	<section id="imageHolder" class="container mx-auto section-spacing">
		<img
			src="/images/bolbeckLearning5.jpg"
			class="rounded-lg shadow-lg my-auto mx-auto size-2/6"
			alt="Kid listing to an audiobook"
		/>
	</section>
	<MainFooter />
</main>


<style>
    .section-spacing {
        margin-bottom: 2.75rem;
    }
</style>
