<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ChatBubble from '$lib/chat/ChatBubble.svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import type { PageData } from './$types.js';
	import FormButtons from '$lib/form/FormButtons.svelte';
	import { afterUpdate } from 'svelte';
	import { RoleEnum, StatusEnum, AssistName } from '$lib/message';
	import { getLocalTime } from '$lib/utils/timeUtils';

	export let data: PageData;

	let element: HTMLDivElement;
	const userBubbleColor = "chat-bubble-info";
	const botBubbleColor = "";
	const searchPageUrl: string = "/";
	const btnLabels = {"submitLbl": "Submit", "deleteLbl": "Clear", "backLbl": "Back", "confirmationDelMsg": "Clear our chat history? "};

	const { form, errors, constraints, enhance, delayed } = superForm(data.form, { resetForm: true,
		onSubmit: () => {
			data.messages = [
				...data.messages,
				{messageText: tempMessage, role: RoleEnum.enum.user, time: getLocalTime(), status: StatusEnum.enum.sent, name: 'Me'},
				{messageText: '...', role: RoleEnum.enum.assistant, time: getLocalTime(), status: StatusEnum.enum.sent, name: AssistName},
			];
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

<div class="flex flex-col chat-wrapper">
	<div bind:this={element} id="chatHistory" class="flex-1 overflow-y-auto  m-5 p-2 ">
		{#each data.messages as msg}
			<ChatBubble
				username={msg.name}
				message={msg.messageText}
				role={msg.role}
				messageTime={msg.time}
				messageStatus={msg.status}
				bubbleColor={msg.role === "user" ? userBubbleColor : botBubbleColor}
			/>
		{/each}
	</div>

	<form method="POST" use:enhance class="m-5 p-2">
		<TextAreaField
			id="messageText"
			bind:value={tempMessage}
			errors={$errors.messageText}
			constraints={$constraints.messageText}
		/>
		<FormButtons
			submitLbl={btnLabels.submitLbl}
			deleteLbl={btnLabels.deleteLbl}
			backLbl={btnLabels.backLbl}
			delayed={$delayed}
			objectId='chat'
			confirmationDelMsg={btnLabels.confirmationDelMsg}
			backUrl={searchPageUrl}
		/>
	</form>
</div>

<style>
    .chat-wrapper {
        height: 90vh; /* Make the wrapper take the full height of the viewport */
    }
</style>