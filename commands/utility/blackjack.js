const { SlashCommandBuilder } = require('discord.js');

function shuffleCards(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blackjack')
		.setDescription('Gambling.'),
	async execute(interaction) {
		// Inicio lógica juego
		cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		shuffleCards(cartas);
		primeraCarta = cartas.pop();
		segundaCarta = cartas.pop();
		terceraCarta = cartas.pop();
		cuartaCarta = cartas.pop();

		console.log('Iniciando juego...');
		console.log('Tu mano: ', primeraCarta, terceraCarta);
		console.log('La mano del crupier: ', segundaCarta);

		await interaction.reply('NIGGA');
	},
};