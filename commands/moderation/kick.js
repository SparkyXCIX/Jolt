const { SlashCommandBuilder } = require('discord.js');
const { topRoles } = require('../../botBrain.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for kicking').setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');
		const initMember = interaction.member;
		if (initMember._roles.filter(role => topRoles.includes(role)).length == 0) {
			return interaction.reply({ content: 'You don\'t have perms to kick a member. <:pandaSweat:1121452996555976764>' });
		}
		const filteredArray = member._roles.filter(value => topRoles.includes(value));
		if (filteredArray.length == 0) {
			member.kick();
			if (reason == null) {
				return interaction.reply({ content: `Kicked ${member} <:PandaCop:1121702415759056917>` });
			}
			return interaction.reply({ content: `Kicked ${member} for ${reason} <:PandaCop:1121702415759056917>` });
		}
		else {
			return interaction.reply({ content: `Cannot kick ${member} <:PandWut:1121452981636833403>` });
		}
	},
};