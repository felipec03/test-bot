const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back'));

module.exports = {
	data: data,
	async execute(interaction) {
		const mensaje = interaction.options.getString('input');
		await interaction.reply(mensaje);
	},
};