const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Información del servidor actual y el usuario que lo haya llamado.'),
	async execute(interaction) {
		await interaction.reply(`El nombre del servidor es: ${interaction.guild.name} y tiene ${interaction.guild.memberCount} usuarios. \n
            El usuario que llamó este comando se llama: ${interaction.user.name}, este se unió el ${interaction.user.joinedAt}.`);
	},
};