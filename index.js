// Se añaden comandos para command handling
// Nativo de node

// fs: lee directorio de comandos
const fs = require('node:fs');
// path
const path = require('node:path');

// Codigo base de "https://discordjs.guide/creating-your-bot/main-file.html#running-your-application"
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
// guild === server
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

// Estructura de datos, analogo a map
client.commands = new Collection();

// Construye un path de comandos
const foldersPath = path.join(__dirname, 'commands');
// Retorna un arreglo con todas las carpetas de la carpeta de comandos
const commandsFolder = fs.readdirSync(foldersPath);

// Para cada archivo en la carpeta de archivos...
for (const folder of commandsFolder) {
	const commandsPath = path.join(foldersPath, folder);
	// todos los archivos de comando terminan con "js", filtrarlos
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Para cada archivo en los archivos de comando, setear cada uno, filtrando todos los .js
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Configurar nuevo item en la colección, con la llave primaria siendo el nombre del comando
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		// Si o si necesita data o execute
		else {
			console.log(`[WARNING] el comando ${filePath} requiere de la propiedad "data" o "execute".`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
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
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});