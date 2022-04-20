import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from "@discordjs/builders";
import { readdirSync } from 'fs';

import { token,clientId,guildId } from "./config.json"

console.log(token,clientId,guildId);

const commands = [];
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const { command } : { command: SlashCommandBuilder } = require(`./commands/${file}`);
    commands.push(command.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();