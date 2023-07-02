const { SlashCommandBuilder } = require('discord.js');
const { topRoles } = require('../../botBrain.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for ban').setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');
		const initMember = interaction.member;
		if (initMember._roles.filter(role => topRoles.includes(role)).length == 0) {
			return interaction.reply({ content: 'You don\'t have perms to ban a member. <:pandaSweat:1121452996555976764>' });
		}
		const filteredArray = member._roles.filter(value => topRoles.includes(value));
		if (filteredArray.length == 0) {
			member.ban();
			if (reason == null) {
				return interaction.reply({ content: `Banned ${member} <:DiscordBan:1121456553455784037> <:PandaCop:1121702415759056917>` });
			}
			return interaction.reply({ content: `Banned ${member} for ${reason} <:DiscordBan:1121456553455784037> <:PandaCop:1121702415759056917>` });
		}
		else {
			return interaction.reply({ content: `Cannot ban ${member.nickname} <:PandWut:1121452981636833403>` });
		}
	},
};