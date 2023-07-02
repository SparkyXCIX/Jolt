const { SlashCommandBuilder } = require('discord.js');
const { topRoles } = require('../../botBrain.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge a number of messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to purge')),
	async execute(interaction) {
		const initMember = interaction.member;
		const amount = interaction.options.getInteger('amount');
		if (amount < 1 || amount > 99) {
			return interaction.reply({ content: 'You need to input a number between 1 and 99. <:pandaSweat:1121452996555976764>', ephemeral: true });
		}
		if (initMember._roles.filter(role => topRoles.includes(role)).length == 0) {
			return interaction.reply({ content: 'You don\'t have perms to purge messages. <:pandaSweat:1121452996555976764>' });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'There was an error trying to purge messages in this channel! <:pandaSweat:1121452996555976764>', ephemeral: true });
		});
		return interaction.reply({ content: `Successfully purged \`${amount}\` messages. <:pandaPirate:1121453010694979645>`, ephemeral: true });
	},
};