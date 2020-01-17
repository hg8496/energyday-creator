import { janitza } from "@hg8496/definitions";
import { mapProtoBufferToSeconds, mapSecondsToProtoBuffer } from "../TimeBaseMapper";
import TimeBase = janitza.values.TimeBase;

it("Expect to return null on unknown values", () => {
    expect(mapSecondsToProtoBuffer(7)).toBe(null);
});

[10, 60, 300, 600, 900, 1800, 3600].forEach(sec => {
    it(`Check there is a non null answer when asked for ${sec}`, () => {
        expect(mapSecondsToProtoBuffer(sec)).toBeGreaterThanOrEqual(0);
    });
});

[
    { num: 10, tb: TimeBase.Seconds10 },
    { num: 60, tb: TimeBase.Minutes1 },
    { num: 300, tb: TimeBase.Minutes5 },
    { num: 600, tb: TimeBase.Minutes10 },
    { num: 900, tb: TimeBase.Minutes15 },
    { num: 1800, tb: TimeBase.Minutes30 },
    { num: 3600, tb: TimeBase.Minutes60 },
].forEach(({ num, tb }) => {
    it(`Check answer is ${num} when asked for ${tb}`, () => {
        expect(mapProtoBufferToSeconds(tb)).toBe(num);
    });
});
