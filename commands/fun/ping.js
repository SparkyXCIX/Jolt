const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with latency!'),
	async execute(interaction) {
		await interaction.reply(`Pong! \n**Latency:** ${Date.now() - interaction.createdTimestamp}ms\n<:PikaSlurp:1121456587404488739>`);
	},
};