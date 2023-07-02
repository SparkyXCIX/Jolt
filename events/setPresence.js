async function setPresence(client) {
  const utc = new Date()
  const hrs = utc.getUTCHours();
  if (hrs >= 5 && hrs <= 12) {
    client.user.setPresence({ activities: [{ name: 'Self-suistenance' }], status: '' });
  }
  else if (hrs >= 12 && hrs <= 20) {
    client.user.setPresence({ activities: [{ name: 'Self-suistenance' }], status: 'idle' });
  }
  else {
    client.user.setPresence({ activities: [{ name: 'Self-suistenance' }], status: 'dnd' });
  }
}

module.exports = { setPresence };