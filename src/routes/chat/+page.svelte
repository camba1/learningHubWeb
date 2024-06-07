<!--<script lang="ts">-->
<!--	import { page } from '$app/stores';-->
<!--	import ChatBubble from '$lib/chat/ChatBubble.svelte';-->
<!--	import TextAreaField from '$lib/form/TextAreaField.svelte';-->
<!--	import { Trash2, Send } from 'lucide-svelte';-->
<!--	import type { PageData } from './$types.js';-->
<!--	import { superForm } from 'sveltekit-superforms';-->
<!--	;-->
<!--	export let data: PageData;-->


<!--	const { form, errors, constraints, enhance, delayed, message } = superForm(-->
<!--		data.form, {-->
<!--			// resetForm: true,-->
<!--			onSubmit: () => {-->
<!--				const newMsg = {	name: "me",-->
<!--					msg: $form.msg,-->
<!--					role: "user",-->
<!--					time: "12:45",-->
<!--					status: "sent"-->
<!--					};-->
<!--				data.messages = [...data.messages, newMsg];-->
<!--				console.log(data.messages);-->

<!--			}-->
<!--		}-->
<!--	);-->

<!--	let userBubbleColor = "chat-bubble-info";-->
<!--	let botBubbleColor = "";-->

<!--</script>-->

<!--{#each data.messages as message}-->
<!--	<ChatBubble username={message.name} message={message.msg} role={message.role}-->
<!--						messageTime={message.time} messageStatus={message.status}-->
<!--						bubbleColor={message.role === "user" ? userBubbleColor : botBubbleColor}/>-->
<!--{/each}-->

<!--<form method="POST" use:enhance >-->
<!--	<div class="join-vertical">-->
<!--		<TextAreaField  id="msg" bind:value={$form.msg}-->
<!--										errors={$errors.msg} constraints={$constraints.msg}/>-->
<!--		<button name="submit" id="submit" class="btn btn-xs w-full"> <Send class="w-4 h-4"/>Send</button>-->
<!--		<button name="delete" id="delete" class="btn btn-xs w-full"> <Trash2 class="w-4 h-4"/>Clear</button>-->
<!--	</div>-->
<!--</form>-->

<!--{#if $message}-->
<!--	<h5 class:invalid={$page.status >= 400}>{$message}</h5>-->
<!--{/if}-->

<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ChatBubble from '$lib/chat/ChatBubble.svelte';
	import { Trash2, Send } from 'lucide-svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
	const userBubbleColor = "chat-bubble-info";
	const botBubbleColor = "";

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, { resetForm: false,
		onSubmit: () => {
			data.messages = [
				...data.messages,
				{messageText: tempMessage, role: 'user'},
				// "..."
			]
			// Clear the input field on submit.
			tempMessage = "";
		}
	});

	// Prevent Superforms from overwriting the form element value on form action return.
	let tempMessage = $form.messageText;
	$: $form.messageText = tempMessage;
</script>

<!--<ul>-->
<!--	{#each data.messages as message}-->
<!--		<li>{message}</li>-->
<!--	{/each}-->
<!--</ul>-->

{#each data.messages as msg}
	{tempMessage}
	<ChatBubble username="test" message={msg.messageText} role={msg.role}
						messageTime="12:45" messageStatus="sent"
						bubbleColor={msg.role === "user" ? userBubbleColor : botBubbleColor}/>
{/each}

<form method="POST" use:enhance>
<!--	<input-->
<!--		name="message"-->
<!--		autofocus-->
<!--		bind:value={message}-->
<!--		placeholder="Send message"-->
<!--	/>-->
	<TextAreaField  id="messageText" bind:value={tempMessage}
											errors={$errors.messageText} constraints={$constraints.messageText}/>
	<button name="submit" id="submit" class="btn btn-xs w-full"> <Send class="w-4 h-4"/>Send</button>
	<button name="delete" id="delete" class="btn btn-xs w-full"> <Trash2 class="w-4 h-4"/>Clear</button>
</form>

<!--<form method="POST" use:enhance >-->
<!--	<div class="join-vertical">-->
<!--		<TextAreaField  id="message" bind:value={message}-->
<!--										errors={$errors.msg} constraints={$constraints.msg}/>-->
<!--		<button name="submit" id="submit" class="btn btn-xs w-full"> <Send class="w-4 h-4"/>Send</button>-->
<!--		<button name="delete" id="delete" class="btn btn-xs w-full"> <Trash2 class="w-4 h-4"/>Clear</button>-->
<!--	</div>-->
<!--</form>-->