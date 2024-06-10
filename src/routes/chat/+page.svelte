<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ChatBubble from '$lib/chat/ChatBubble.svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import type { PageData } from './$types.js';
	import FormButtons from '$lib/form/FormButtons.svelte';
	import { afterUpdate } from 'svelte';

	export let data: PageData;

	let element: HTMLDivElement;
	const userBubbleColor = "chat-bubble-info";
	const botBubbleColor = "";
	const searchPageUrl: string = "/";
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document "};



	const { form, errors, constraints, enhance, delayed } = superForm(data.form, { resetForm: true,
		onSubmit: () => {
			data.messages = [
				...data.messages,
				{messageText: tempMessage, role: 'user', time: '12:45', status: 'sent', name: 'me'},
				{messageText: '...', role: 'assistant', time: '12:46', status: 'sent', name: 'AI'},
			]
			// Clear the input field on submit.
			tempMessage = "";
		}
	});

	// Prevent Superforms from overwriting the form element value on form action return.
	let tempMessage = $form.messageText;
	$: $form.messageText = tempMessage;

	
	const scrollToBottom = async (node: HTMLDivElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	afterUpdate(() => {
		// Scroll to bottom when new messages are added.
		if($form) scrollToBottom(element);
	});

	$: if ($form && element) {
		scrollToBottom(element);
	}

</script>

<div bind:this={element} class="max-h-96 overflow-y-auto border border-grey-500/100 mx-5 p-2">
	{#each data.messages as msg}

		<ChatBubble username={msg.name} message={msg.messageText} role={msg.role}
							messageTime={msg.time} messageStatus={msg.status}
							bubbleColor={msg.role === "user" ? userBubbleColor : botBubbleColor}/>
	{/each}
</div>

<form method="POST" use:enhance class="mx-5">

	<TextAreaField  id="messageText" bind:value={tempMessage}
											errors={$errors.messageText} constraints={$constraints.messageText}/>
	<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
							 delayed={$delayed} objectId='chat' confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg, 'chat', "?")}
							 backUrl={searchPageUrl}/>
</form>
