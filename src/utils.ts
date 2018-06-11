import fs from "fs"

export function writeFile(content: string, filepath: string): Promise<void> {
    return new Promise<void>( (resolve, reject) => {
        fs.writeFile(filepath, content, (e) => {
            if (e) reject(e)
            else resolve()
        })
    })
}

export function readFile(filepath: string): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        fs.readFile(filepath, (e, msg) => {
            if (e) reject(e)
            else resolve(msg.toString())
        })
    })
}

export function removeFile(filepath: string): Promise<void> {
    return new Promise<void>( (resolve, reject) => {
        fs.unlink(filepath, (err) => {
            if (err) reject(err)
            else resolve()
        })
    } )
}