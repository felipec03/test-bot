// Se añaden comandos para command handling
// Nativo de node

// fs: lee directorio de comandos
const fs = require('node:fs');
const path = require('node:path');

// Codigo base de "https://discordjs.guide/creating-your-bot/main-file.html#running-your-application"
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
// guild === server
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

// nuevo código para manejar eventos
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Para cada archivo en la carpeta "events"
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	// Se revisa si es que solo se ejecuta una o n veces
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);