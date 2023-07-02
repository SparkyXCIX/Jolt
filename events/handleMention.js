const { GenConvos } = require('../botBrain.json');
const { handleCarrot } = require('./handleCarrot');

function handleMention(message) {
	const txt = message.content.toLocaleLowerCase();
	const IsAprc = txt.includes('you\'re cute') || txt.includes('good lookin') || txt.includes('beautiful') || txt.includes('nice') || txt.includes('awesome') || txt.includes('good') || txt.includes('pretty') || txt.includes('cool') || txt.includes('intelligent') || txt.includes('pretty') || txt.includes('good looking') || txt.includes('cute') || txt.includes('smart');
	if (txt.includes('love')) {
		return message.reply('<:PandaLove:1121702402723156018>');
	}
	else if (txt.includes('aww')) {
		return message.reply('<:PandaHappy:1121702427696046172>');
	}
	else if (txt.includes('yay')) {
		return message.reply('<a:PandaGift:1121450156957646858>');
	}
	else if (txt.includes('happy')) {
		return message.reply('<a:PandaGift:1121450156957646858>');
	}
	else if (txt.includes('carrot')) {
		return false;
	}

	// Reply type
	if (message.type == 19) {
		if (IsAprc) {
			return message.reply(GenConvos[0].thx[Math.floor(Math.random() * (GenConvos[0].thx.length))]);
		}
		else {
			return message.reply(GenConvos[0].sorry[Math.floor(Math.random() * (GenConvos[0].sorry.length))]);
		}
	}

	// @mention
	return message.reply(GenConvos[0].Greets[Math.floor(Math.random() * (GenConvos[0].Greets.length))]);

}
module.exports = { handleMention };