import { ITimedValue } from "@hg8496/gridvis-client/dist/values/ITimedValue";
import {mapITimedValueToNumber} from '../EnergyDayCreator';

it("Expect to return max if is correct value", () => {
    const max = 1.23;
    const avg = 1.2;
    const min = 1.1;
    const value = {min, avg, max} as ITimedValue;
    expect(mapITimedValueToNumber(value)).toBe(max);
});

it("Expect to return avg if max is NaN value", () => {
    const max = Number.NaN;
    const avg = 1.2;
    const min = 1.1;
    const value = {min, avg, max} as ITimedValue;
    expect(mapITimedValueToNumber(value)).toBe(avg);
});

it("Expect to return avg if max is Infinite value", () => {
    const max = Number.POSITIVE_INFINITY;
    const avg = 1.2;
    const min = 1.1;
    const value = {min, avg, max} as ITimedValue;
    expect(mapITimedValueToNumber(value)).toBe(avg);
});