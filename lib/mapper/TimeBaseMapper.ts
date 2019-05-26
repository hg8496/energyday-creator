import { janitza } from "@hg8496/definitions";
import TimeBase = janitza.values.TimeBase;

export function mapSecondsToProtoBuffer(timebase: number): TimeBase | null {
    let result = null;
    switch (timebase) {
        case 10:
            result = TimeBase.Seconds10;
            break;
        case 60:
            result = TimeBase.Minutes1;
            break;
        case 300:
            result = TimeBase.Minutes5;
            break;
        case 600:
            result = TimeBase.Minutes10;
            break;
        case 900:
            result = TimeBase.Minutes15;
            break;
        case 1800:
            result = TimeBase.Minutes30;
            break;
        case 3600:
            result = TimeBase.Minutes60;
            break;
    }
    return result;
}
