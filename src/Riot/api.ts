import fetch from "node-fetch";

import type { Schedule } from "./../types/Riot/Schedule";
import { Tournament } from "../types/Riot/Tournament";


const apiKey = process.env["RIOT_KEY"];
const baseUrl = "https://euw1.api.riotgames.com";

const tournamentUrl = baseUrl + "/lol/clash/v1/tournaments";

export {
    GetTournaments
};

async function GetTournaments(): Promise<Tournament[]> {
    const data = await fetch(tournamentUrl, {
        headers: {
            "X-Riot-Token": apiKey,
            "Accept-Language": "en-US,en;q=0.9" 
        }
    })
    .then(res => res.json());

    return data as Tournament[];
}