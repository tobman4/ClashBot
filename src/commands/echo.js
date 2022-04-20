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
exports.exec = exports.command = void 0;
const builders_1 = require("@discordjs/builders");
const command = new builders_1.SlashCommandBuilder()
    .setName("echo")
    .setDescription("test")
    .addStringOption(opt => opt.setName("text")
    .setDescription("text to echo")
    .setRequired(true));
exports.command = command;
function exec(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = event.options.getString("text");
        event.reply(msg);
    });
}
exports.exec = exec;
//# sourceMappingURL=echo.js.map