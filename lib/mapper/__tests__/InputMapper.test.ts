import { janitza } from "@hg8496/definitions";
import { mapInputToProtoBuffer } from "../InputMapper";
import Input = janitza.values.Input;
import Line = janitza.values.Line;

it("Expect to return null on unknown values", () => {
    expect(mapInputToProtoBuffer("asdf")).toBe(null);
});

[
    { input: "10", channel: 10 },
    { input: "Input1", channel: 1 },
    { input: "Input_2", channel: 2 },
].forEach(({ input, channel }) => {
    it(`Check there is a non null answer when asked for ${input}`, () => {
        expect(mapInputToProtoBuffer(input)).toStrictEqual(new Input({ channel }));
    });
});

[
    { input: "L1", line: Line.L1 },
    { input: "L2", line: Line.L2 },
    { input: "L3", line: Line.L3 },
    { input: "N", line: Line.N },
    { input: "SUM13", line: Line.SUM13 },
].forEach(({ input, line }) => {
    it(`Check there is a non null answer when asked for ${input}`, () => {
        expect(mapInputToProtoBuffer(input)).toStrictEqual(new Input({ line }));
    });
});
