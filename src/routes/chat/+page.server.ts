import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import {type MessageDB, MessageSchema, RoleEnum, StatusEnum, AssistName, maxNumberOfMessagesKept} from '$lib/message';
import {getLocalTime} from '$lib/utils/timeUtils';

const messages: MessageDB[] = [];

const userName:string = "Me";

function getAssistantReply() {
	return 'This is a response';
}

export const load = async () => {
	const form: MessageDB = {messageText: '', role: RoleEnum.enum.assistant, status: StatusEnum.enum.delivered, name: AssistName, time: getLocalTime()}
	return {
		form,
		messages
	};
};

export const actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(MessageSchema));

		if (!form.valid) return fail(400, { form });

		messages.push({ messageText: form.data.messageText, role: RoleEnum.enum.user , status: StatusEnum.enum.delivered, name:  userName , time: getLocalTime()});
		if (messages.length > maxNumberOfMessagesKept) {
			messages.splice(0, 2);
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
		messages.push({ messageText: getAssistantReply(), role: RoleEnum.enum.assistant , status: StatusEnum.enum.delivered, name: AssistName, time: getLocalTime()});

		return {
			form,
			messages
		};
	}
};