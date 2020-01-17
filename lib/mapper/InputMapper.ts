import { janitza } from "@hg8496/definitions";
import Input = janitza.values.Input;
import Line = janitza.values.Line;

export function mapInputToProtoBuffer(input: string): Input | null {
    let result = null;
    switch (input) {
        case "L1":
            result = new Input({ line: janitza.values.Line.L1 });
            break;
        case "L2":
            result = new Input({ line: janitza.values.Line.L2 });
            break;
        case "L3":
            result = new Input({ line: janitza.values.Line.L3 });
            break;
        case "L4":
            result = new Input({ line: janitza.values.Line.L4 });
            break;
        case "N":
            result = new Input({ line: janitza.values.Line.N });
            break;
        case "SUM13":
            result = new Input({ line: janitza.values.Line.SUM13 });
            break;
        default:
            const match = input.match(/\d+/);
            if (match) {
                result = new Input({ channel: Number(match[0]) });
            }
    }
    return result;
}
export function mapProtoBufferToInput(input: Input): string | null {
    let result = null;
    if (input.line) {
        switch (input.line) {
            case Line.L1:
                result = "L1";
                break;
            case Line.L2:
                result = "L2";
                break;
            case Line.L3:
                result = "L3";
                break;
            case Line.L4:
                result = "L4";
                break;
            case Line.N:
                result = "N";
                break;
            case Line.SUM13:
                result = "SUM13";
                break;
        }
    } else if (input.channel) {
        result = `Input-${input.channel}`;
    }
    return result;
}
