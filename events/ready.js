const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Excelente, logueado cómo: ${client.user.tag}`);
	},
};