<script lang="ts">
import { Bot } from 'lucide-svelte';
import { User } from 'lucide-svelte';

export let  username: string;
export let  message: string;
export let  messageTime: string;
export let  messageStatus: string;
export let role: string;
export let bubbleColor: string = "";

</script>

<div class="chat {role === 'user' ? 'chat-end' : 'chat-start'} ">
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			{#if (role === "user")}
				<User class="w-10 h-10"/>
			{:else}
				<Bot class="w-10 h-10"/>
			{/if}
		</div>
	</div>
	<div class="chat-header">
		{username}
		<time class="text-xs opacity-50">{messageTime}</time>
	</div>
	{#if (role !== "user" && message === "...")}
		<div class="chat-bubble {bubbleColor}"><span class="loading loading-dots loading-xs"></span></div>
	{:else}
		<div class="chat-bubble {bubbleColor}">{message}</div>
	{/if}
	<div class="chat-footer opacity-50">
		{messageStatus}
	</div>
</div>