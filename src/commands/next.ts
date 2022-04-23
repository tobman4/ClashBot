import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { format,differenceInDays } from "date-fns";

import { GetTournaments } from "../Riot/api";


export { command, exec };

const command = new SlashCommandBuilder()
    .setName("next")
    .setDescription("Get next clash")
    .addNumberOption(opt => 
        opt.setName("count")
        .setDescription("How many tournaments to get(default 1)")
        .setMinValue(1)
        .setMaxValue(10)
    );

async function exec(event: CommandInteraction) {
    try {
        const count = event.options.getNumber("count",false);
        const tournaments = await GetTournaments();

        if(!(tournaments?.length > 1)) {
            event.reply("Riot did not want to tell me :(");
            return;
        }

        const next = tournaments.sort((a,b) => a.schedule[0].startTime - b.schedule[0].startTime)[0];
        const daysToNext = differenceInDays(new Date(next.schedule[0].startTime),new Date())
        // await event.reply(`Next clash in ${daysToNext} days`);
        let msg = `Next clash in ${daysToNext} days\n`;

        let toSend = count ? count : 1;
        if(tournaments.length < toSend) toSend = tournaments.length;
        
        for(let i = 0; i < toSend; i++) {
            const t = tournaments[i];
            const time = format(new Date(t.schedule[0].startTime),"MMM dd HH:mm");
            const line = `${t.schedule[0].cancelled ? ":x:" : ""} ${time} - ${t.nameKey}-${t.nameKeySecondary}`
            msg += line + "\n";

        }
        await event.reply(msg);

    } catch(err) {
        console.error(err);
        if(event.replied) { 
            event.followUp("I failed :(");
        }  else {
            event.reply("I failed :(");
        }
    }
}