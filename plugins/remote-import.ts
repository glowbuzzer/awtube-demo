// remote-import.js
import https from "https"
import { promises as fs } from "fs"
import { dirname, resolve } from "path"

const cacheDir = resolve("./node_modules/.cache/remote-import")

function getCachePath(url: string) {
    const { hostname, pathname } = new URL(url)
    return resolve(cacheDir, `${hostname}/${pathname}`)
}

async function fetchFileAsBuffer(url, cachePath) {
    const path = resolve(cachePath, ".")
    try {
        // Try to read from cache first
        return await fs.readFile(path)
    } catch {
        // If the cache read fails, fetch from remote
        const buffer = await new Promise<Buffer>((resolve, reject) => {
            https.get(url, res => {
                const data = []
                res.on("data", chunk => data.push(chunk))
                res.on("end", () => {
                    const buffer = Buffer.concat(data)
                    resolve(buffer)
                })
                res.on("error", reject)
            })
        })
        // Ensure cache directory exists
        await fs.mkdir(dirname(path), { recursive: true })
        // Save to cache
        await fs.writeFile(path, buffer)
        return buffer
    }
}

export function remoteImport() {
    return {
        name: "remote-import",
        async resolveId(source: string) {
            if (source.startsWith("remote://")) {
                return source.replace("remote://", "remote-import:")
            }
            return null
        },
        async load(id: string) {
            if (id.startsWith("remote-import:")) {
                const url = id.replace("remote-import:", "https://")
                const cachePath = getCachePath(url)
                const buffer = await fetchFileAsBuffer(url, cachePath)
                const base64 = buffer.toString("base64")

                // Return a module that contains the ArrayBuffer and the url
                return `
                      const base64 = ${JSON.stringify(base64)};
                      export default { 
                        buffer: Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer, 
                        url: ${JSON.stringify(url)} 
                      };
                `
            }
            return null
        }
    }
}
