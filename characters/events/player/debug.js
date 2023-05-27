import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	name: "debug",
	async execute(queue, message) {
		if (message.includes("was marked as finished")) {
			const matchingArray = /Track {"title":"(.*?)","isTransitionMode":false} was marked as finished/g.exec(message);
			fs.unlink(path.join(__dirname, '..', '..', 'commands', 'aiVoices', 'mp3s', matchingArray[1]), (err) => {
				if (err) {
					console.error(err)
					return
				}
			})
		}
	},
};