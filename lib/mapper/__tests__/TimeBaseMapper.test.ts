import { mapSecondsToProtoBuffer } from "../TimeBaseMapper";

it("Expect to return null on unknown values", () => {
    expect(mapSecondsToProtoBuffer(7)).toBe(null);
});

[10, 60, 300, 600, 900, 1800, 3600].forEach(sec => {
    it(`Check there is a non null answer when asked for ${sec}`, () => {
        expect(mapSecondsToProtoBuffer(sec)).toBeGreaterThanOrEqual(0);
    });
});
