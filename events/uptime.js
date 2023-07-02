function handleUptime(client) {
  const channel = client.channels.cache.get('1121699305904935032');
  channel.send('I\'m back online! <:pikaSlurp:1121456587404488739>');
}
module.exports = { handleUptime };