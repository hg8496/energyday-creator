#!/usr/bin/env node
import { GridVisClient } from "@hg8496/gridvis-client";
import * as commander from "commander";
import * as moment from "moment";
import { EnergyDayCreator } from "./EnergyDayCreator";
import { findDevice } from "./index";
import { doesMap } from "./mapper";

commander
    .version("1.0.0")
    .arguments("<URL> <project> <device_serial>")
    .option("-u, --username <username>", "Specify username", "admin")
    .option("-p, --password <password>", "Specify password", "Janitza")
    .parse(process.argv);

async function main() {
    const url = commander.args[0] || missingParameter("No URL specified");
    const projectParam = commander.args[1] || missingParameter("No project specified");
    const deviceParam = commander.args[2] || missingParameter("No device serial number specified");
    const client = new GridVisClient({
        password: commander.password,
        url,
        username: commander.username,
    });
    const prjDevice = await findDevice(client, projectParam, deviceParam);
    if (prjDevice) {
        const { project, device } = prjDevice;
        const values = await client.values.list(project, device);
        const knownValues = values.filter(value => doesMap(value));
        const now = moment().hour(5); // Always use 5. hour of the day. Less problems with DST.
        let then = moment(now).subtract(2, "month");
        while (now.isSameOrAfter(then)) {
            const dayCreator = new EnergyDayCreator(client, prjDevice, then);
            const dayString = then.format("YYYY-MM-DD");
            for (const value of knownValues) {
                await dayCreator.addValue(value);
            }
            await dayCreator.write("/tmp/allEnergy" + dayString);
            then = then.add(1, "days");
        }
    }
}

function missingParameter(text: string): string {
    console.log(text);
    commander.outputHelp();
    process.exit(1);
    return "";
}

main();
