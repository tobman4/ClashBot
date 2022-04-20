"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const fs_1 = require("fs");
const config_json_1 = require("./config.json");
console.log(config_json_1.token, config_json_1.clientId, config_json_1.guildId);
const commands = [];
const commandFiles = (0, fs_1.readdirSync)('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const { command } = require(`./commands/${file}`);
    commands.push(command.toJSON());
}
const rest = new rest_1.REST().setToken(config_json_1.token);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(v9_1.Routes.applicationGuildCommands(config_json_1.clientId, config_json_1.guildId), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}))();
//# sourceMappingURL=push.js.map