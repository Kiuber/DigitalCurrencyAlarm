export interface IDigitalCurrency {
    new(currency: string);
    checkAndGetMeetConditionCount(): Promise<Number>;
}

