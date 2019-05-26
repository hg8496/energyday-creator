import { janitza } from "@hg8496/definitions";
import { mapGridVisToProtoBuffer, mapProtoBufferToGridVis } from "../ValueMapper";
import EnergyValueType = janitza.values.EnergyValueType;

it("Expect to return null on unknown values", () => {
    const gridVisValue = "asdf";
    expect(mapGridVisToProtoBuffer(gridVisValue)).toBe(null);
});

it("Expect to return correct enum on known value", () => {
    const gridVisValue = "ApparentEnergy";
    expect(mapGridVisToProtoBuffer(gridVisValue)).toBe(EnergyValueType.ApparentEnergy);
});

[
    "PowerActive",
    "PowerApparent",
    "PowerReactivefund",
    "ActiveEnergy",
    "ActiveEnergyConsumed",
    "ActiveEnergySupplied",
    "ApparentEnergy",
    "ReactiveEnergy",
].forEach(value => {
    it(`Check there is a non null answer when asked for ${value}`, () => {
        expect(mapGridVisToProtoBuffer(value)).toBeGreaterThanOrEqual(0);
    });
});

[
    EnergyValueType.ActiveEnergy,
    EnergyValueType.ActiveEnergyConsumed,
    EnergyValueType.ActiveEnergySupplied,
    EnergyValueType.ActivePower,
    EnergyValueType.ApparentEnergy,
    EnergyValueType.ApparentPower,
    EnergyValueType.ReactiveEnergy,
    EnergyValueType.ReactivePower,
].forEach(pbuf => {
    it(`Check there is a non null answer when asked for ${pbuf}`, () => {
        expect(mapProtoBufferToGridVis(pbuf)).toBeTruthy();
    });
});

it("Expect to return null on unknown pvalue", () => {
    expect(mapProtoBufferToGridVis(125)).toBe(null);
});
