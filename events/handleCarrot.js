const { party, carrot } = require('../botBrain.json');

function handleCarrot(message) {
  if (message.content.includes('<:carrot4Jolt:1121818019950231632><:carrot4Jolt:1121818019950231632><:carrot4Jolt:1121818019950231632><:carrot4Jolt:1121818019950231632>') || message.content.includes('🥕🥕🥕')) {
    if (!message.member._roles.some(role => role.id === '1122410073017307206')) {
      message.member.roles.add('1122410073017307206');
    } return message.reply(party[Math.floor(Math.random() * (party.length))]);
  }
  return message.reply(carrot[Math.floor(Math.random() * (carrot.length))]);
  ;
}

module.exports = { handleCarrot };