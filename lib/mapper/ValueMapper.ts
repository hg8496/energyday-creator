import { janitza } from "@hg8496/definitions";
import EnergyValueType = janitza.values.EnergyValueType;

export function mapGridVisToProtoBuffer(value: string): EnergyValueType | null {
    let result = null;
    switch (value) {
        case "ActiveEnergy":
            result = EnergyValueType.ActiveEnergy;
            break;
        case "ActiveEnergyConsumed":
            result = EnergyValueType.ActiveEnergyConsumed;
            break;
        case "ActiveEnergySupplied":
            result = EnergyValueType.ActiveEnergySupplied;
            break;
        case "ApparentEnergy":
            result = EnergyValueType.ApparentEnergy;
            break;
        case "ReactiveEnergy":
            result = EnergyValueType.ReactiveEnergy;
            break;
        case "PowerActive":
            result = EnergyValueType.ActivePower;
            break;
        case "PowerApparent":
            result = EnergyValueType.ApparentPower;
            break;
        case "PowerReactivefund":
            result = EnergyValueType.ReactivePower;
            break;
        case "Water":
            result = EnergyValueType.Water;
            break;
        case "Gas":
            result = EnergyValueType.Gas;
            break;
    }
    return result;
}

export function mapProtoBufferToGridVis(value: EnergyValueType): string | null {
    let result = null;
    switch (value) {
        case EnergyValueType.ActiveEnergy:
            result = "ActiveEnergy";
            break;
        case EnergyValueType.ActiveEnergyConsumed:
            result = "ActiveEnergyConsumed";
            break;
        case EnergyValueType.ActiveEnergySupplied:
            result = "ActiveEnergySupplied";
            break;
        case EnergyValueType.ApparentEnergy:
            result = "ApparentEnergy";
            break;
        case EnergyValueType.ReactiveEnergy:
            result = "ReactiveEnergy";
            break;
        case EnergyValueType.ActivePower:
            result = "PowerActive";
            break;
        case EnergyValueType.ApparentPower:
            result = "PowerApparent";
            break;
        case EnergyValueType.ReactivePower:
            result = "PowerReactivefund";
            break;
        case EnergyValueType.Water:
            result = "Water";
            break;
        case EnergyValueType.Gas:
            result = "Gas";
            break;
    }
    return result;
}
