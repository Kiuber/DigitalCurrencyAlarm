import axios from 'axios';
import { config as digitalCurrencyConfig } from '../../config/digital-currency'
import { IDigitalCurrency } from '../IDigitalCurrency';

// https://www.coingecko.com/api/documentations/v3
const API_PRE = 'https://api.coingecko.com/api/v3/coins/';

const thresholdCheckFn = function (currency, currentPriceMap) {
    let count = 0;
    for (const [compareCurrency, threshold] of Object.entries(digitalCurrencyConfig[currency].threshold)) {
        console.log(`currency: ${currency}, compare currency: ${compareCurrency}, current price: ${currentPriceMap[compareCurrency]}, and threshold config: ${JSON.stringify(threshold)}`);
        // @ts-ignore
        if (currentPriceMap[compareCurrency] >= threshold.max) {
            count++;
        }
        // @ts-ignore
        if (currentPriceMap[compareCurrency] <= threshold.min) {
            count++;
        }
    }
    return count;
};

// @ts-ignore
export class DigitalCurrencyCheckerImpl implements IDigitalCurrency {

    readonly currency: string;
    constructor(currency: string) {
        this.currency = currency;
    }

    async checkAndGetMeetConditionCount(): Promise<Number> {
        let count = 0;
        const api = API_PRE + digitalCurrencyConfig[this.currency].coin;
        await axios.get(api, {
            params: {
                market_data: true,
                localization: false,
                tickers: false,
                community_data: false,
                developer_data: false,
                sparkline: false,
            }
        })
            .then(resp => {
                if (resp.status === 200) {
                    count = thresholdCheckFn(this.currency, resp.data.market_data.current_price);
                }
            }).catch(e => console.error(e));

        return new Promise(function(resolve) {
            resolve(count);
        });
    }
}