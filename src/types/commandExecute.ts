import { Interaction } from "discord.js"
export type CommandExecute = (interaction: Interaction) => Promise<void>;