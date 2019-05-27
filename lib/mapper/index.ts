import { janitza } from "@hg8496/definitions";
import { IValueDescription } from "@hg8496/gridvis-client/dist/values/IValueDescription";
import { mapInputToProtoBuffer } from "./InputMapper";
import { mapSecondsToProtoBuffer } from "./TimeBaseMapper";
import { mapGridVisToProtoBuffer } from "./ValueMapper";
import ValueStream = janitza.values.ValueStream;
import IValueStream = janitza.values.IValueStream;

export { mapInputToProtoBuffer };
export { mapSecondsToProtoBuffer };
export { mapGridVisToProtoBuffer };

export function doesMap(value: IValueDescription): boolean {
    return (
        mapGridVisToProtoBuffer(value.valueType.value) !== null &&
        mapSecondsToProtoBuffer(value.timebase) !== null &&
        mapInputToProtoBuffer(value.valueType.type) !== null
    );
}

export function mapToValueStream(value: IValueDescription): IValueStream | null {
    let result = null;
    const tb = mapSecondsToProtoBuffer(value.timebase);
    const vt = mapGridVisToProtoBuffer(value.valueType.value);
    const input = mapInputToProtoBuffer(value.valueType.type);
    if (tb !== null && vt !== null && input !== null) {
        result = new ValueStream();
        result.timebase = tb;
        result.type = vt;
        result.input = input;
    }
    return result;
}
