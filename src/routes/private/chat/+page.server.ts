import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { AssistName, type MessageSchemaType, MessageSchema, RoleEnum, StatusEnum } from '$lib/schemas/message';
import { getLocalTime } from '$lib/utils/timeUtils';
import { RemoteRunnable } from '@langchain/core/runnables/remote';
import { ExternalURLs } from '$lib/server/utils/externalUrls';

export const load = async (event) => {

	// @ts-expect-error session is injected by clerk
	const userId: string = event.locals.session.userId

	const form: MessageSchemaType = {messageText: '', userId: userId, role: RoleEnum.enum.assistant, status: StatusEnum.enum.delivered, name: AssistName, time: getLocalTime()}
	return {
		form,
		AIMessage: {}
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
			//TODO: Implement

			return {
				form,
				AIMessage: {}
			};
		}


		if (!form.data.messageText || form.data.messageText === '') {
			const llmMessage: MessageSchemaType = {
				messageText: "Please provide a non empty message",
				userId: userId,
				role: RoleEnum.enum.assistant,
				status: StatusEnum.enum.delivered,
				name: AssistName,
				time: getLocalTime()
			}
			return {
				form,
				AIMessage: llmMessage
			};
		}

		const msgForLLM = getMessageTextForLLM(form.data.messageText, formData)
		// console.log(msgForLLM)
		const llmReply: string = <string>await getAssistantReply(msgForLLM, 'secret-token')

		const llmMessage: MessageSchemaType = {
			messageText: llmReply,
			userId: userId,
			role: RoleEnum.enum.assistant,
			status: StatusEnum.enum.delivered,
			name: AssistName,
			time: getLocalTime()
		}

		return {
			form,
			AIMessage: llmMessage,
		};
	}
};


function getMessageTextForLLM(formMsgText: string, formData: FormData) {
	let tmpMsg = ""

	tmpMsg = get_additional_LLM_context_message(formData, 'filename', 'filename')
	tmpMsg += get_additional_LLM_context_message(formData, 'docDetail_key', 'document detail key')
	if (tmpMsg === "") {
		return formMsgText
	}
	return formMsgText + "\n Additional context to be used only if calling a function: " + tmpMsg
}

function get_additional_LLM_context_message(formData: FormData, formData_varName:string, varLabel:string ) {

	if (!formData.has(formData_varName)) {
		return ""
	}

	const var_value = formData.get(formData_varName)
	if (!var_value || var_value === '') {
		return ""
	}

	return `The ${varLabel} is ${var_value} . `;
}

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
		messages: [messageText]
	})
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
