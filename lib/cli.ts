#!/usr/bin/env node
import { janitza } from "@hg8496/definitions";
import { GridVisClient } from "@hg8496/gridvis-client";
import * as commander from "commander";
import * as fs from "fs";
import * as moment from "moment";
import { Writer } from "protobufjs";
import { findDevice } from "./index";
import { doesMap, mapToValueStream } from "./mapper";
import EnergyDay = janitza.values.EnergyDay;

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
            const dayString = then.format("YYYY-MM-DD");
            const day = EnergyDay.create();
            day.day = dayString;
            const date = "ISO8601_" + dayString;
            for (const value of knownValues) {
                const vs = mapToValueStream(value);
                const data = await client.values.getValues(project, device, value, date, date);
                if (data.values.length > 0 && vs) {
                    vs.values = data.values.map(eValue => eValue.avg);
                    day.values.push(vs);
                }
            }
            if (!EnergyDay.verify(day)) {
                const writer: Writer = Writer.create();
                EnergyDay.encode(day, writer);
                const wStream = fs.createWriteStream("/tmp/allEnergy" + dayString);
                wStream.write(writer.finish());
                wStream.close();
            }
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
