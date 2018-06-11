export abstract class Persistatnce{

    abstract save(msg: string, timestamp: number): Promise<void>
    abstract load(timestamp: number): Promise<string>
    abstract delete(timestamp: number): Promise<void>

    abstract setLatestUpdateTime(timestamp: number): Promise<number>
    abstract getLatestUpdateTime(): Promise<number>

    async commit(msg: string){
        const update = Date.now()
        await this.save(msg, update)
        const previousUpdateTime = await this.setLatestUpdateTime(update)
        await this.delete(previousUpdateTime)
    }

    async getLatestRecord(){
        const latest = await this.getLatestUpdateTime()
        return await this.load(latest)
    }

}

export default Persistatnce

import fs from "./fs"
export { fs }
