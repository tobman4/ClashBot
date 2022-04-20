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
const date_fns_1 = require("date-fns");
const api_1 = require("../Riot/api");
const command = new builders_1.SlashCommandBuilder()
    .setName("next")
    .setDescription("Get next clash")
    .addNumberOption(opt => opt.setName("count")
    .setDescription("How many tournaments to get(default 1)")
    .setMinValue(1)
    .setMaxValue(10));
exports.command = command;
function exec(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = event.options.getNumber("count", false);
            const tournaments = yield (0, api_1.GetTournaments)();
            if (!((tournaments === null || tournaments === void 0 ? void 0 : tournaments.length) > 1)) {
                event.reply("Riot did not want to tell me :(");
                return;
            }
            const next = tournaments.sort((a, b) => a.schedule[0].startTime - b.schedule[0].startTime)[0];
            const daysToNext = (0, date_fns_1.differenceInDays)(new Date(next.schedule[0].startTime), new Date());
            // await event.reply(`Next clash in ${daysToNext} days`);
            let msg = `Next clash in ${daysToNext} days\n`;
            let toSend = count ? count : 1;
            if (tournaments.length < toSend)
                toSend = tournaments.length;
            for (let i = 0; i < toSend; i++) {
                const t = tournaments[i];
                const time = (0, date_fns_1.format)(new Date(t.schedule[0].startTime), "MMM dd HH:mm");
                const line = `${t.schedule[0].cancelled ? ":x:" : ""} ${time} - ${t.nameKey}-${t.nameKeySecondary}`;
                msg += line + "\n";
            }
            yield event.followUp(msg);
        }
        catch (err) {
            console.error(err);
            if (event.replied) {
                event.followUp("I failed :(");
            }
            else {
                event.reply("I failed :(");
            }
        }
    });
}
exports.exec = exec;
//# sourceMappingURL=next.js.map