const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar of the selected user, or your own.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		let user = interaction.options.getUser('target');
		if (!user) user = interaction.user;
		const embedAvatar = new EmbedBuilder()
			.setTitle(`${user.username}'s Avatar`)
			.setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
		return interaction.reply({ embeds: [ embedAvatar ] });
	},
};