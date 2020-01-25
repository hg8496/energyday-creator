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

export function mapProtoBufferToSeconds(timebase: TimeBase): number | null {
    let result = null;
    switch (timebase) {
        case TimeBase.Seconds10:
            result = 10;
            break;
        case TimeBase.Minutes1:
            result = 60;
            break;
        case TimeBase.Minutes5:
            result = 300;
            break;
        case TimeBase.Minutes10:
            result = 600;
            break;
        case TimeBase.Minutes15:
            result = 900;
            break;
        case TimeBase.Minutes30:
            result = 1800;
            break;
        case TimeBase.Minutes60:
            result = 3600;
            break;
    }
    return result;
}
