import { Persistatnce } from ".";

import fs from "fs"

import * as u from "./utils"

export class FS extends Persistatnce{

    constructor(public prefix: string){
        super()
    }

    calDataStoreFileName(timestamp: number){
        return `${this.prefix}.${timestamp}`
    }

    calTimestampName(){
        return `${this.prefix}.latest_timestamp`
    }

    save(msg: string, timestamp: number): Promise<void> {
        return u.writeFile(
            msg, this.calDataStoreFileName(timestamp))
    }

    load(timestamp: number): Promise<string> {
        return u.readFile(this.calDataStoreFileName(timestamp))
    }

    delete(timestamp: number): Promise<void> {
        return u.removeFile(this.calDataStoreFileName(timestamp))
    }

    async setLatestUpdateTime(timestamp: number): Promise<number> {
        const previous = await this.getLatestUpdateTime()
        u.writeFile(`${timestamp}`, this.calTimestampName())
        return previous
    }

    latestTime: number | undefined = undefined
    async getLatestUpdateTime(): Promise<number> {
        if (this.latestTime === undefined) {
            this.latestTime = Number.parseInt(
                await u.readFile(this.calTimestampName()))
        }
        return this.latestTime
    }

}



