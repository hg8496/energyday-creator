import { GridVisClient, IDevice, IProject } from "@hg8496/gridvis-client";
import { IValueDescription } from "@hg8496/gridvis-client/dist/values/IValueDescription";
import { EnergyDayCreator } from "./EnergyDayCreator";
import { doesMap } from "./mapper";

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

export async function findNeededValues(
    client: GridVisClient,
    projectName: IProject,
    device: IDevice,
): Promise<IValueDescription[]> {
    const values = await client.values.list(projectName, device);
    return values.filter(value => doesMap(value));
}

export { EnergyDayCreator };
