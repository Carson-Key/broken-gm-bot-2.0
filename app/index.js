import child from 'child_process'
import { fileURLToPath } from 'url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = () => {

    console.log("Starting Bots\n")

    // Main Bot

    let mainBot = child.spawn("node", [
        path.join(__dirname, '..', 'main', 'index.js')
    ]);
    mainBot.stdout.on('data', (data) => {
        const log = data.toString();
        console.log("====================== Main Bot =======================")
        console.log(log)
        console.log("=======================================================")
    });
    mainBot.stderr.on('data', (data) => {
        const error = data.toString();
        console.log("=================== Main Bot Error ====================")
        console.log(error);
        console.log("=======================================================")
    });

    // Character Bot

    let charactersBot = child.spawn("node", [
        path.join(__dirname, '..', 'characters', 'index.js')
    ]);
    charactersBot.stdout.on('data', (data) => {
        const log = data.toString();
        console.log("=================== Characters Bot ====================")
        console.log(log)
        console.log("=======================================================")
    });
    charactersBot.stderr.on('data', (data) => {
        const error = data.toString();
        console.log("================ Characters Bot Error =================")
        console.log(error);
        console.log("=======================================================")
    });


    process.on('SIGINT', () => {
		console.info("\nClosed")
        mainBot.kill("SIGINT");
        charactersBot.kill("SIGINT");
		process.exit(0)
	})
}

main()