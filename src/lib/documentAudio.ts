import { z } from 'zod';

export const DocumentAudioSchema = z.object({
	id: z.string().uuid(),
	documentsProcessedId: z.string().uuid(),
	audioFilePath: z.string().url(), //relative to the output folder
	documentPageNumber: z.number(),
	voiceName: z.string().min(1).max(50),
	createdAt: z.date().default(() => new Date()), // Date doc was first processed
	updatedAt: z.date().default(() => new Date()).optional(),
})

type documentVoicesDB = z.infer<typeof DocumentAudioSchema>[]

export const DocumentVoices: documentVoicesDB = [
	{
		id: '7a7f3dd5-9a61-41ce-853f-2b6345362341',
		documentsProcessedId: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		audioFilePath: 'MonsterDayOut/MonsterDayOut_20.mp3',
		documentPageNumber: 1,
		voiceName: 'Jenny',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '7a7f3dd5-9a61-41ce-853f-2b6345362342',
		documentsProcessedId: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		audioFilePath: 'MonsterDayOut/MonsterDayOut_20.wav',
		documentPageNumber: 2,
		voiceName: 'Jenny',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "7a7f3dd5-9a61-41ce-853f-2b6345362343",
		documentsProcessedId: "8a7f3dd5-9a61-41ce-853f-2b6345362342",
		audioFilePath: 'MonsterDayOut/MonsterDayOut_22.flac',
		documentPageNumber: 1,
		voiceName: 'Jenny',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]