import { SlashCommandBuilder } from "@discordjs/builders";
import type { Interaction, CacheType, CommandInteraction } from "discord.js";

export { command, exec };

const command = new SlashCommandBuilder()
    .setName("echo")
    .setDescription("test")
    .addStringOption(opt =>
        opt.setName("text")
        .setDescription("text to echo")
        .setRequired(true)
    );

    
async function exec(event: CommandInteraction<CacheType>) {
    const msg = event.options.getString("text");

    event.reply(msg);
}