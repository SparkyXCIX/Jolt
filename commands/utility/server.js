const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		await interaction.reply(
			`# Server Info 
Official name: ${interaction.guild.name} 
Member Count: ${interaction.guild.memberCount} 
Established: <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:f>
			`,
		);
	},
};