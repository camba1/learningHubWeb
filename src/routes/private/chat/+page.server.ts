import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import {type MessageDB, MessageSchema, RoleEnum, StatusEnum, AssistName, maxNumberOfMessagesKept} from '$lib/message';
import {getLocalTime} from '$lib/utils/timeUtils';

let messages: MessageDB[] = [];

const userName:string = "Me";

function getAssistantReply() {
	return 'This is a response';
}

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

		if (!form.valid) return fail(400, { form });

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
		await new Promise((resolve) => setTimeout(resolve, 1000));
		messages.push({ messageText: getAssistantReply(), userId:userId, role: RoleEnum.enum.assistant , status: StatusEnum.enum.delivered, name: AssistName, time: getLocalTime()});

		return {
			form,
			messages
		};
	}
};