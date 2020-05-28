import { CronJob } from 'cron'
import { Audio } from './enum/Audio'
import { IPlayer } from "./interface/IPlayer"
import { PlayerImpl } from './interface/impl/PlayerImpl'
import { DigitalCurrencyCheckerImpl } from "./interface/impl/DigitalCurrencyImpl";
import { config as digitalCurrencyConfig } from "./config/digital-currency"

let checkerClassMap = {};
const player: IPlayer = new PlayerImpl();

const cronTime = '*/10 * * * * *';
const tickFn = function () {
    for (const [currency, _] of Object.entries(digitalCurrencyConfig)) {
        if (!checkerClassMap[currency]) {
            checkerClassMap[currency] = new DigitalCurrencyCheckerImpl(currency);
        }
        checkerClassMap[currency].checkAndGetMeetConditionCount().then((count) => {
            for (let i = 0; i < count; i++) {
                player.play(Audio.YOU_SUFFER)
            }
        });
    }
};
new CronJob(cronTime, tickFn, () => {}, true);
