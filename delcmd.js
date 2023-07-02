const { REST, Routes } = require('discord.js');
require('dotenv').config();
const [ clientId, token, guildId ] = [process.env.clientId, process.env.token, process.env.guildId];
const rest = new REST().setToken(token);

console.log('Script runnning...');
rest.put(Routes.applicationCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);