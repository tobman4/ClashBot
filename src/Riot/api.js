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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournaments = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const apiKey = process.env["RIOT_KEY"];
const baseUrl = "https://euw1.api.riotgames.com";
const tournamentUrl = baseUrl + "/lol/clash/v1/tournaments";
function GetTournaments() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, node_fetch_1.default)(tournamentUrl, {
            headers: {
                "X-Riot-Token": apiKey,
                "Accept-Language": "en-US,en;q=0.9"
            }
        })
            .then(res => res.json());
        return data;
    });
}
exports.GetTournaments = GetTournaments;
//# sourceMappingURL=api.js.map