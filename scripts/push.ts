import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from "@discordjs/builders";
import { readdirSync } from 'fs';

import "dotenv/config";

const token = process.env["DISC_KEY"];
const clientId = process.env["CLIENT_ID"];
const guildId = process.env["GUILD_ID"];

if(!token || !clientId || !guildId) throw new Error("Missing environment variables");

const commands = [];
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.ts'));


console.log(`Found ${commandFiles.length} commands`);
for (const file of commandFiles) {

	try {

		console.log(`Loading Command: ${file}`);
		const { command } : { command: SlashCommandBuilder } = require(`./src/commands/${file}`);
		console.log(`Registering Command: ${command.name}`);
		commands.push(command.toJSON());
	} catch(err) {
		console.error(`Failed to load command: ${file}`);
	
		if(process.env["NODE_ENV"] === "development") {
			console.error(err);
		} else {
			throw err;
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	console.log('Started refreshing application (/) commands.');

	await rest.put(
		Routes.applicationGuildCommands(clientId, guildId),
		{ body: commands },
	);

	console.log('Successfully reloaded application (/) commands.');
})();