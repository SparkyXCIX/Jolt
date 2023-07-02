const { Client, IntentsBitField, Events, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const token = process.env.token;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { topRoles } = require('./botBrain.json');
const { deployCommands } = require('./deploy-commands');
const { handleUptime } = require('./events/uptime.js');
const { handleMention } = require('./events/handleMention');
const { handleCarrot } = require('./events/handleCarrot');
const { keepAlive } = require('./server');
const { setPresence } = require('./events/setPresence');
// Discord Client Object
const client = new Client(
	{
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.DirectMessages,
			IntentsBitField.Flags.GuildPresences,
			GatewayIntentBits.MessageContent,
			IntentsBitField.Flags.GuildMessages,
			GatewayIntentBits.GuildMembers],
	},
);

// Commands Location
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Fetch Commands
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
		}
	}
}

// Events
client.on('messageCreate', (message) => {
	// Bot message
	if (message.author.bot) return false;

	// @everyone ping
	if (message.mentions.everyone) {
		const filteredArray = message.member._roles.filter(value => topRoles.includes(value));
		if (filteredArray.length == 0) {
			message.delete();
			message.channel.send({ content: `${message.member} Please don't ping everyone!` });
			return false;
		}
		else {
			return false;
		}
	}

	// @Jolt ping
	if (message.mentions.has(client.user.id)) {
		try {
			handleMention(message);
		}
		catch (err) {
			console.log(err.message);
		}
	}

	// Jolt no ping
	if (message.content.toLowerCase().includes('jolt')) {
		try {
			handleMention(message);
		}
		catch (err) {
			console.log(err.message);
		}
	}
	// Carrot
	if (message.content.includes(':carrot4Jolt:') || message.content.includes('🥕')) {
		handleCarrot(message);
	}
	// @mentions
	if (message.mentions.members != null) {
		if (message.mentions.roles != null) return false;
		if (message.type != 19) {
			if (message.mentions.members.first()._roles.includes('1121353251577671680')) {
				message.channel.send({content: `${message.member} Don't ping ${message.mentions.members.first().user.username}, they opted not to be mentioned.`});
				message.delete();
			}
		}
		return false;
	}
});

// Bot Online
client.once(Events.ClientReady, botClient => {
	console.log(`Ready! Logged in as ${botClient.user.tag}`);
	handleUptime(client);
	setPresence(client);
	var promise = Promise.resolve(true);
	setInterval(() => { promise = promise.then(setPresence(client)) }, 60000);
});

// Handle Interaction
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

// Login
keepAlive();
client.login(token);