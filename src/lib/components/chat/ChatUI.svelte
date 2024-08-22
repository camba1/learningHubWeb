<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ChatBubble from '$lib/components/chat/ChatBubble.svelte';
	import TextAreaField from '$lib/components/form/TextAreaField.svelte';
	import FormButtons from '$lib/components/form/FormButtons.svelte';
	import SubmitToast from '$lib/components/form/SubmitToast.svelte';
	import { afterUpdate } from 'svelte';
	import { RoleEnum, StatusEnum, AssistName } from '$lib/schemas/message';
	import { getLocalTime } from '$lib/utils/timeUtils';
	import { page } from '$app/stores';

	import type { MessageSchemaType} from '$lib/schemas/message';

	// export let data;
	export let searchPageUrl = "/";
	export let btnLabels = { "submitLbl": "Submit", "deleteLbl": "Clear", "backLbl": "Back", "confirmationDelMsg": "Clear our chat history? " };
	export let additionalLLMContext = "";

	let element: HTMLDivElement;
	const userBubbleColor = "chat-bubble-info";
	const botBubbleColor = "";

const initial_data: MessageSchemaType = {
	messageText: "",
	role: RoleEnum.enum.user,
	time: getLocalTime(),
	status: StatusEnum.enum.sent,
	name: 'Me',
	userId: '123'
};

let chatMessages: MessageSchemaType[] = [];


	const { form, errors, constraints, enhance, delayed, message } = superForm(initial_data, {
		onSubmit: ({ formData }) => {
			if (!chatMessages){chatMessages = []}
			chatMessages = [
				...chatMessages,
				{ messageText: tempMessage, role: RoleEnum.enum.user, time: getLocalTime(), status: StatusEnum.enum.sent, name: 'Me', userId: '123' },
				{ messageText: '...', role: RoleEnum.enum.assistant, time: getLocalTime(), status: StatusEnum.enum.sent, name: AssistName, userId: '456' },
			];
			tempMessage = "";
			formData.set('additionalLLMContext', additionalLLMContext);
		},
		// onResult: ({ result }) => {
		// 	if (result.type === 'success') {
		// 		console.log(result);
		// 	}
		// },
		onUpdate: ({ result }) => {

			if (result.type === 'success') {
				if (chatMessages && chatMessages.length > 1) {
					chatMessages.pop()
				}
				chatMessages = [
					...chatMessages,
					result.data.AIMessage
				];
				tempMessage = "";
			}
		},
		// onUpdated: ({ form }) => {
		// 		console.log(form);
		// }
	});

	// let mymessages: MessageSchemaType[];

	// Prevent Superforms from overwriting the form element value on form action return.
	let tempMessage = $form.messageText;
	$: $form.messageText = tempMessage;

	const scrollToBottom = async (node: HTMLDivElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	afterUpdate(() => {
		if ($form) scrollToBottom(element);
	});

	$: if ($form && element) {
		scrollToBottom(element);
	}

</script>

<SubmitToast message={$message} page_status={$page.status} />

<div class="flex flex-col chat-wrapper">
	<div bind:this={element} id="chatHistory" class="flex-1 overflow-y-auto  m-5 p-2 ">
		{#if chatMessages}
			{#each chatMessages as msg}
				<ChatBubble
					username={msg.name}
					message={msg.messageText}
					role={msg.role}
					messageTime={msg.time}
					messageStatus={msg.status}
					bubbleColor={msg.role === "user" ? userBubbleColor : botBubbleColor}
				/>
			{/each}
			{/if}
	</div>

	<form method="POST" use:enhance class="m-5 p-2" action="/private/chat">
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
