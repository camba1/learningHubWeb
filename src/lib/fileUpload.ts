import { z } from 'zod';

const MAX_FILE_SIZE = 10000000;
const allowedFileTypes = [ "pdf", "docx"];

function checkFileType(file: File) {
	if (file?.name) {
		const fileType = file.name.split(".").pop();
		if (fileType && allowedFileTypes.includes(fileType)) return true;
	}
	return false;
}

export const FileSchema = z.object({
	file: z
		.instanceof(File, { message: 'Please upload a file.'})
		.refine((f) => f.size < MAX_FILE_SIZE, 'Max 10 MB upload size.')
		.refine((f ) => checkFileType(f), `Only ${allowedFileTypes.join()} formats are supported.`)
});