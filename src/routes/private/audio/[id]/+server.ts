import fs from 'fs';
import { stat } from 'fs/promises';
import { DocumentVoices } from '$lib/documentAudio'
import { error } from '@sveltejs/kit';

export const GET = async ({params}) => {
	const docVoice = DocumentVoices.find((d) => d.id == params.id);
	if (!docVoice) throw error(404, 'Document Audio record not found.');

	const filePath = docVoice.audioFilePath  //path.join('output', 'MonsterDayOut_20.mp3');
	// const filePath = path.resolve('src/media/audio-file.mp3');
	const fileStats = await stat(filePath);
	const fileSize = fileStats.size;

	try {
		const fileStream = fs.createReadStream(filePath);

		const stream = new ReadableStream({
			start(controller) {
				fileStream.on('data', (chunk) => {
					controller.enqueue(chunk);
				});
				fileStream.on('end', () => {
					controller.close();
				});
				fileStream.on('error', (err) => {
					controller.error(err);
				});
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'audio/mpeg',
				// 'Cache-Control': 'public, max-age=3600'
				'Content-Length': fileSize.toString()
			}
		});
	} catch (err) {
		return new Response('Audio file not found', {
			status: 404
		});
	}
};