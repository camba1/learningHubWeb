<script lang="ts">
	import ChatBubble from '$lib/chat/ChatBubble.svelte';
	import TextAreaField from '$lib/form/TextAreaField.svelte';
	import { Trash2, Send } from 'lucide-svelte';
	import type { PageData } from '../../../.svelte-kit/types/src/routes/document/[[id]]/$types.js';
	import { superForm } from 'sveltekit-superforms';
	;
	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(
		data.form, {
			resetForm: false
		}
	);

	let userBubbleColor = "chat-bubble-info";
	let botBubbleColor = "";

</script>

{#each data.messages as message}
	<ChatBubble username={message.name} message={message.msg} role={message.role}
						messageTime={message.time} messageStatus={message.status}
						bubbleColor={message.role === "user" ? userBubbleColor : botBubbleColor}/>
{/each}

<form method="POST" use:enhance >
	<div class="join-vertical">
		<TextAreaField  id="message"/>
		<button name="submit" id="submit" class="btn btn-xs w-full"> <Send class="w-4 h-4"/>Send</button>
		<button name="delete" id="delete" class="btn btn-xs w-full"> <Trash2 class="w-4 h-4"/>Clear</button>
	</div>
</form>