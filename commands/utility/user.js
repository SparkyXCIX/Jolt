const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about a user.').addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		let user = interaction.options.getMember('target');
		if (!user) user = interaction.member;
		let roleM = [];
		user._roles.forEach(role => { roleM.push(`<@&${role}>`);});
		const embedUser = new EmbedBuilder()
			.setTitle(`# ${user.user.username}'s Info`)
			.setImage(`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png?size=64`)
			.setDescription(
				`Name: ${user.user.username}
				Nickname: ${user.nickname}
				Member since: <t:${Math.floor(user.joinedTimestamp / 1000)}:f>
				Roles: ${roleM}`,
			);
		console.log(user);
		return interaction.reply({ embeds: [embedUser] });
	},
};