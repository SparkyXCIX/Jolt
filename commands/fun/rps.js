const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Play a game of Rock, Paper and Scissors')
		.addStringOption(option => option.setName('choice').setDescription('Rock/Paper/Scissors').setRequired(true)),
	async execute(interaction) {
		try {
			const choices = ['rock', 'paper', 'scissors'];
			const uc = String(interaction.options.getString('choice')).toLowerCase();
			const cc = choices[Math.floor(Math.random() * 3)];
			if (choices.includes(uc)) {
				if (uc == cc) {
					await interaction.reply({ content: `I played ${cc}, it's a draw. <:PikaSlurp:1121456587404488739>` });
				}
				else if ((uc == 'rock' && cc == 'scissors') || (uc == 'paper' && cc == 'rock') || (uc == 'scissors' && cc == 'paper')) {
					await interaction.reply({ content: `I played ${cc}, you won! <:PandaHappy:1121702427696046172>` });
				}
				else {
					await interaction.reply({ content: `I played ${cc}, you lost. <:PandaSad:1121451302573056040>` });
				}
			}
			else {
				await interaction.reply({ content: 'Please choose a valid option: Rock, Paper, Scissors <:pikaThink:1121830683518705796>' });
			}
		}
		catch {
			await interaction.reply({ content: '<:pikaThink:1121830683518705796> Something went wrong, try again in a while' });
		}
	},
};