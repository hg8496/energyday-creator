import { GridVisClient, IDevice, IProject } from "@hg8496/gridvis-client";
import { IValueDescription } from "@hg8496/gridvis-client/dist/values/IValueDescription";
import { EnergyDayCreator } from "./EnergyDayCreator";
import { doesMap as DoesMapFilter } from "./mapper";

export interface IProjectDevice {
    project: IProject;
    device: IDevice;
}

export async function findDevice(
    client: GridVisClient,
    projectName: string,
    serial: string,
): Promise<IProjectDevice | null> {
    let result = null;
    const project = (await client.projects.list()).find(p => projectName === p.name);
    if (project) {
        const device = (await client.devices.list(project)).find(d => serial === d.serialNr);
        if (device) {
            result = { project, device };
        }
    }
    return result;
}

const ValueTypeTimebaseComparator = (vd1: IValueDescription, vd2: IValueDescription) => {
    if (vd1.valueType.value > vd2.valueType.value) {
        return 1;
    } else if (vd1.valueType.value < vd2.valueType.value) {
        return -1;
    } else {
        if (vd1.valueType.type > vd2.valueType.type) {
            return 1;
        } else if (vd1.valueType.type < vd2.valueType.type) {
            return -1;
        } else {
            return vd1.timebase - vd2.timebase;
        }
    }
};

const UniqueValueTypeFilter = (vd: IValueDescription, idx: number, arr: IValueDescription[]) => {
    let result = true;
    if (idx > 0) {
        result =
            arr[idx - 1].valueType.value !== arr[idx].valueType.value ||
            arr[idx - 1].valueType.type !== arr[idx].valueType.type;
    }
    return result;
};

export async function findNeededValues(
    client: GridVisClient,
    projectName: IProject,
    device: IDevice,
): Promise<IValueDescription[]> {
    const values = await client.values.list(projectName, device);
    return values
        .filter(DoesMapFilter)
        .sort(ValueTypeTimebaseComparator)
        .filter(UniqueValueTypeFilter);
}

export { EnergyDayCreator };
