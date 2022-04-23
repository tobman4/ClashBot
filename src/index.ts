import { Client, Intents } from 'discord.js';
import { readdirSync } from 'fs';

import "dotenv/config";

import { GetTournaments } from './Riot/api';


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = {};

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log("Ready: ", client.user.id);
});

client.on('interactionCreate', event => {
    if(event.isCommand()) {
        console.log("Command: ", event.commandName, " User: ", event.user.id);
        commands[event.commandName](event);
    }
});

//Load commands
const files = readdirSync(__dirname + "/commands").filter(f => f.endsWith(".js"));
files.forEach(file => {
    const { command, exec } = require(`./commands/${file}`);
    commands[command.name] = exec;
});

if(!process.env["RIOT_KEY"]) {
    throw Error("Missing RIOT_KEY en");
}

if(!process.env["DISC_KEY"]) {
    throw Error("Missing DISC_KEY");
}

client.login(process.env["DISC_KEY"]);