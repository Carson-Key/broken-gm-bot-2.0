import { SlashCommandBuilder } from 'discord.js';
import { QueryType } from 'discord-player';
import customVoice from '../../../helpers/voices/custom.js';

export default {
	data: new SlashCommandBuilder()
		.setName('voice-prompt')
		.setDescription('Has the bot say chat gpt 3.5 turbo\'s response to your prompt in the voice of your choice')
        .addStringOption(option =>
			option
				.setName('voice-id')
				.setRequired(true)
				.setDescription('The ID of the voice you want spoken'))
        .addStringOption(option =>
			option
				.setName('prompt')
				.setRequired(true)
				.setDescription('The prompt you want to put through chat gpt 3.5 turbo'))
        .addNumberOption(option =>
            option
                .setName('stability')
                .setDescription('The stability value'))
        .addNumberOption(option =>
            option
                .setName('similarity')
                .setDescription('The similarity value')),
	async execute(interaction) {
        const prompt = interaction.options.getString('prompt', true);
        const voiceId = interaction.options.getString('voice-id', true);
        const stability = interaction.options.getNumber('stability')
        const similarity = interaction.options.getNumber('similarity')

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

        const fileName = await customVoice(voiceId, message, stability, similarity)

        try {
            const { track } = await interaction.client.player.play(channel, fileName, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp({ content: `**Having Voice ${voiceId} say:** ${message}`, ephemeral: true});
        } catch (e) {
            console.error(`Bad: ${e}`)
            return interaction.followUp({ content: `Something went wrong`, ephemeral: true});
        }
	},
};