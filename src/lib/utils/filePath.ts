import path from 'node:path';
import fs from 'fs';

const dataFolderName:	string ='appData'

const get_full_filepath = (filePath:string) => {
	const fulllFilePath = path.join(process.cwd(), dataFolderName, filePath);
	if (!fs.existsSync(fulllFilePath)) {
		fs.mkdirSync(fulllFilePath, { recursive: true });
	}
	return fulllFilePath;
}

export const uploadPath = get_full_filepath('uploads')
export const outputPath = get_full_filepath('output')