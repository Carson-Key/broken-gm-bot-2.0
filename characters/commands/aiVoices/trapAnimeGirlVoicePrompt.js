import { SlashCommandBuilder } from 'discord.js';
import { fileURLToPath } from 'url';
import path from 'node:path';
import { QueryType } from 'discord-player';
import trapAnimeGirlVoice from '../../../helpers/voices/trapAnimeGirl.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	data: new SlashCommandBuilder()
		.setName('trap-anime-girl-voice-prompt')
		.setDescription('Has the bot say chat gpt 3.5 turbo\'s response to your prompt in the voice of a Trap Anime Girl')
        .addStringOption(option =>
			option
				.setName('prompt')
				.setRequired(true)
				.setDescription('The prompt you want to put through chat gpt 3.5 turbo')),
	async execute(interaction) {
        const prompt = interaction.options.getString('prompt', true);

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply({ ephemeral: true });

        let message = "Something Went Wrong"

        try {
            const completion = await interaction.client.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: `${prompt}, in 2500 characters or less`}],
            });

            message = completion.data.choices[0].message.content
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
            return interaction.followUp({ content: `Something went wrong`});
        }

        const fileName = await trapAnimeGirlVoice(message)

        try {
            const { track } = await interaction.client.player.play(channel, fileName, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp({ content: `**Having Trap Anime Girl say:** ${message}`, ephemeral: true});
        } catch (e) {
            console.error(`Bad: ${e}`)
            return interaction.followUp({ content: `Something went wrong`, ephemeral: true});
        }
	},
};