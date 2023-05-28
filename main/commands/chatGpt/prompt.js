import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('prompt')
		.setDescription('Will send your prompt to chat gpt').addStringOption(option =>
			option
				.setName('prompt')
				.setRequired(true)
				.setDescription('The prompt you want to send to chat gpt 3.5 turbo model')),
	async execute(interaction) {
        const prompt = interaction.options.getString('prompt', true);

        await interaction.deferReply();

        try {
            const completion = await interaction.client.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: `${prompt}`}],
            });

            const message = completion.data.choices[0].message.content

            return interaction.followUp({ content: `${message}`});
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
            return interaction.followUp({ content: `Something went wrong`});
        }
	},
};