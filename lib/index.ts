import { GridVisClient, IDevice, IProject } from "@hg8496/gridvis-client";

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
