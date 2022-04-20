"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const fs_1 = require("fs");
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
const commands = {};
// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log("Ready: ", client.user.id);
});
client.on('interactionCreate', event => {
    if (event.isCommand()) {
        console.log("Command: ", event.commandName, " User: ", event.user.id);
        commands[event.commandName](event);
    }
});
//Load commands
const files = (0, fs_1.readdirSync)("./src/commands").filter(f => f.endsWith(".js"));
files.forEach(file => {
    const { command, exec } = require(`./commands/${file}`);
    commands[command.name] = exec;
});
if (!process.env["RIOT_KEY"]) {
    throw Error("Missing RIOT_KEY en");
}
client.login(config_json_1.token);
//# sourceMappingURL=index.js.map