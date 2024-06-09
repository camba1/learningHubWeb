<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ChatBubble from '$lib/chat/ChatBubble.svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import type { PageData } from './$types.js';
	import FormButtons from '$lib/form/FormButtons.svelte';

	export let data: PageData;
	const userBubbleColor = "chat-bubble-info";
	const botBubbleColor = "";

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

	const searchPageUrl: string = "/";
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Delete", "backLbl": "Back", "confirmationDelMsg": "Delete document "};

	// Prevent Superforms from overwriting the form element value on form action return.
	let tempMessage = $form.messageText;
	$: $form.messageText = tempMessage;

</script>

<div class="max-h-96 overflow-y-auto border border-grey-500/100 mx-5 p-2">
	{#each data.messages as msg}

		<ChatBubble username={msg.name} message={msg.messageText} role={msg.role}
							messageTime={msg.time} messageStatus={msg.status}
							bubbleColor={msg.role === "user" ? userBubbleColor : botBubbleColor}/>
	{/each}
</div>

<form method="POST" use:enhance class=" mx-5">

	<TextAreaField  id="messageText" bind:value={tempMessage}
											errors={$errors.messageText} constraints={$constraints.messageText}/>
<!--	<button name="submit" id="submit" class="btn btn-xs w-full"> <Send class="w-4 h-4"/>Send</button>-->
<!--	<button name="delete" id="delete" class="btn btn-xs w-full"> <Trash2 class="w-4 h-4"/>Clear</button>-->
	<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
							 delayed={$delayed} objectId='chat' confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg, 'chat', "?")}
							 backUrl={searchPageUrl}/>
</form>

<style>
    .messages-container {
        max-height: 500px; /* Define a fixed height */
        overflow-y: auto; /* Add vertical scroll if overflow */
        border: 1px solid #ccc; /* Optional border styling */
        padding: 10px; /* Optional padding */
    }
</style>