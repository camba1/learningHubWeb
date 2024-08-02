import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { AssistName, maxNumberOfMessagesKept, type MessageDB, MessageSchema, RoleEnum, StatusEnum } from '$lib/message';
import { getLocalTime } from '$lib/utils/timeUtils';
import { RemoteRunnable } from '@langchain/core/runnables/remote';
import { ExternalURLs } from '$lib/server/utils/externalUrls';

let messages: MessageDB[] = [];

const userName:string = "Me";


export const load = async (event) => {

	// @ts-expect-error session is injected by clerk
	const userId: string = event.locals.session.userId

	const form: MessageDB = {messageText: '', userId: userId, role: RoleEnum.enum.assistant, status: StatusEnum.enum.delivered, name: AssistName, time: getLocalTime()}
	return {
		form,
		messages
	};
};

export const actions = {
	default: async ( { request,locals }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(MessageSchema));

		if (!form.valid) return fail(400, { form } );

		// @ts-expect-error session is injected by clerk
		const userId: string = locals.session.userId

		if (formData.has('delete')) {
			// Clear the array of messages and the form.
			messages = [];
			return {
				form,
				messages
			};
		}

		// Add the message to the array of messages.
		messages.push({ messageText: form.data.messageText, userId:userId, role: RoleEnum.enum.user , status: StatusEnum.enum.delivered, name:  userName , time: getLocalTime()});
		if (messages.length > maxNumberOfMessagesKept) {
			messages.splice(0, 2);
		}
		const llmReply: string = <string>await getAssistantReply(form.data.messageText, 'secret-token')
		messages.push({ messageText: llmReply, userId:userId, role: RoleEnum.enum.assistant , status: StatusEnum.enum.delivered, name: AssistName, time: getLocalTime()});

		return {
			form,
			messages
		};
	}
};

async function  getAssistantReply(messageText: string, authToken: string) {
	const remoteChain = new RemoteRunnable({
		url: ExternalURLs.agent,
		options: {
			timeout: 300000, // 5 minutes
			headers: {
				'x-token': authToken,
			},
		},
	});

	const response = await remoteChain.invoke({
		// question: messageText
		messages: [messageText]
	})
	// console.log(response["ChatPromptValue"])
	// console.log(response["messages"])
	const AIResponse = response["messages"]?.pop()?.content
	if (!AIResponse) {
		throw new Error(`Failed to get response from ${AssistName}`);
	}
	return  AIResponse

// const stream = await remoteChain.stream({
// 	param1: "param1",
// 	param2: "param2",
// });

// for await (const chunk of stream) {
// 	console.log(chunk);
// }

}
