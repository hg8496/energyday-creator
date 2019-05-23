#!/usr/bin/env node
import { GridVisClient } from "@hg8496/gridvis-client";
import * as commander from "commander";
import * as moment from "moment";

commander
    .version("1.0.0")
    .arguments("<URL> <device>")
    .option("-u, --username <username>", "Specify username", "admin")
    .option("-p, --password <password>", "Specify password", "Janitza")
    .parse(process.argv);

async function main() {
    if (typeof commander.args[0] === "undefined") {
        console.log("No URL specified");
        commander.outputHelp();
        process.exit(1);
    }
    const client = new GridVisClient({
        password: commander.password,
        url: commander.args[0],
        username: commander.username,
    });
    const projects = await client.projects.list();
    const devices = await client.devices.list(projects[0]);
    const values = await client.values.list(projects[0], devices[0]);
    const activeEnergies = values.filter(value => value.valueType.value.search(/^activeenergyc/gi) >= 0 && (value.timebase === 900 || value.timebase === 3600));
    const now = moment().hour(5); // Always use 5. hour of the day. Less problems with DST.
    let then = moment(now).subtract(2, "years");
    while(now.isSameOrAfter(then)) {
        const date = "ISO8601_" + then.format("YYYY-MM-DD");
        const data = await client.values.getValues(projects[0], devices[0], activeEnergies[0], date, date);
        //console.log(date, data.values.length);
        then = then.add(1, 'days');
    }
}

main();
