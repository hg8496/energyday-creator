import { janitza } from "@hg8496/definitions";
import { GridVisClient } from "@hg8496/gridvis-client";
import { ITimedValue } from "@hg8496/gridvis-client/dist/values/ITimedValue";
import { IValueDescription } from "@hg8496/gridvis-client/dist/values/IValueDescription";
import * as fs from "fs";
import { Moment } from "moment";
import EnergyDay = janitza.values.EnergyDay;
import IEnergyDay = janitza.values.IEnergyDay;
import { Writer } from "protobufjs";
import { IProjectDevice } from "./index";
import { mapToValueStream } from "./mapper";

export function mapITimedValueToNumber(value: ITimedValue): number {
    return value.max && !isNaN(value.max) && isFinite(value.max) ? value.max : value.avg;
}

export class EnergyDayCreator {
    private readonly day: IEnergyDay;

    constructor(
        private client: GridVisClient,
        private projectDevice: IProjectDevice,
        private date: Moment,
        private tz?: string,
    ) {
        const dayString = date.format("YYYY-MM-DD");
        this.day = EnergyDay.create();
        this.day.day = dayString;
        this.day.values = [];
    }

    public async addValue(value: IValueDescription): Promise<void> {
        const date = "ISO8601_" + this.day.day;
        const vs = mapToValueStream(value);
        const { project, device } = this.projectDevice;
        const data = await this.client.values.getValues(project, device, value, date, date, this.tz, value.online);
        if (data.values.length > 0 && vs && this.day.values) {
            vs.values = data.values.map(mapITimedValueToNumber);
            this.day.values.push(vs);
        }
    }

    public writeToBuffer(): Uint8Array | null {
        if (!EnergyDay.verify(this.day)) {
            const writer: Writer = Writer.create();
            EnergyDay.encode(this.day, writer);
            return writer.finish();
        } else {
            return null;
        }
    }

    public async write(file: string): Promise<void> {
        const buffer = this.writeToBuffer();
        if (buffer) {
            const wStream = fs.createWriteStream(file);
            await wStream.write(buffer);
            await wStream.close();
        }
    }
}
