<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ChatBubble from '$lib/chat/ChatBubble.svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import type { PageData } from './$types.js';
	import FormButtons from '$lib/form/FormButtons.svelte';

	export let data: PageData;
	const userBubbleColor = "chat-bubble-info";
	const botBubbleColor = "";

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, { resetForm: true,
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


{#each data.messages as msg}
	{tempMessage}
	<ChatBubble username={msg.name} message={msg.messageText} role={msg.role}
						messageTime={msg.time} messageStatus={msg.status}
						bubbleColor={msg.role === "user" ? userBubbleColor : botBubbleColor}/>
{/each}

<form method="POST" use:enhance>

	<TextAreaField  id="messageText" bind:value={tempMessage}
											errors={$errors.messageText} constraints={$constraints.messageText}/>
<!--	<button name="submit" id="submit" class="btn btn-xs w-full"> <Send class="w-4 h-4"/>Send</button>-->
<!--	<button name="delete" id="delete" class="btn btn-xs w-full"> <Trash2 class="w-4 h-4"/>Clear</button>-->
	<FormButtons submitLbl={btnLabels.submitLbl} deleteLbl={btnLabels.deleteLbl} backLbl={btnLabels.backLbl}
							 delayed={$delayed} objectId='chat' confirmationDelMsg={''.concat(btnLabels.confirmationDelMsg, 'chat', "?")}
							 backUrl={searchPageUrl}/>
</form>
