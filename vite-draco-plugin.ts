// vite-plugin-draco.js
import * as fs from "fs"
import * as https from "https"
import * as path from "path"

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest)

        https
            .get(url, response => {
                if (response.statusCode !== 200) {
                    reject(`Failed to download ${url}: Status Code: ${response.statusCode}`)
                    return
                }
                response.pipe(file)
            })
            .on("error", err => {
                fs.unlink(dest, () => reject(err))
            })

        file.on("finish", () => {
            file.close(resolve)
        }).on("error", err => {
            fs.unlink(dest, () => reject(err))
        })
    })
}

const DRACO_VERSION = "1.5.5"
const DRACO_BASE_URL = `https://www.gstatic.com/draco/versioned/decoders/${DRACO_VERSION}/`
const DRACO_FILES = ["draco_decoder.wasm", "draco_wasm_wrapper.js"]
const TEMP_DIR = "./node_modules/.cache/draco"

async function downloadAndCacheFile(filename) {
    const localPath = path.join(TEMP_DIR, filename)
    if (!fs.existsSync(localPath)) {
        await downloadFile(`${DRACO_BASE_URL}${filename}`, localPath)
    }
    return localPath
}

async function cache_draco_files() {
    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR, { recursive: true })
    }
    await Promise.all(DRACO_FILES.map(downloadAndCacheFile))
}

function viteDracoPluginServe() {
    return {
        name: "vite:draco:serve",

        async config(config, { command }) {
            await cache_draco_files()
        },

        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const urlPath = req.url.split("?")[0] // Remove query string
                const filename = path.basename(urlPath)

                if (DRACO_FILES.includes(filename)) {
                    const filePath = path.join(TEMP_DIR, filename)
                    if (fs.existsSync(filePath)) {
                        res.writeHead(200, {
                            "Content-Type": filename.endsWith(".wasm")
                                ? "application/wasm"
                                : "text/javascript"
                        })
                        fs.createReadStream(filePath).pipe(res)
                        return
                    }
                }

                next()
            })
        }
    }
}

function viteDracoPluginBuild() {
    let config

    return {
        name: "vite:draco:build",
        apply: "build" as "build",

        configResolved(_config) {
            config = _config
        },

        async writeBundle() {
            await cache_draco_files()

            if (!config?.build?.outDir) {
                throw new Error("Could not determine build output directory")
            }
            // Determine the output directory from Vite's build configuration
            const buildOutputDir = path.join(config.root, config.build.outDir, "assets", "draco")

            // Ensure the output directory exists
            if (!fs.existsSync(buildOutputDir)) {
                fs.mkdirSync(buildOutputDir, { recursive: true })
            }

            // Copy the Draco files from the temp directory to the build output
            for (const file of DRACO_FILES) {
                const srcPath = path.join(TEMP_DIR, file)
                const destPath = path.join(buildOutputDir, file)
                if (!fs.existsSync(srcPath)) {
                    throw new Error("File does not exist: " + srcPath)
                }
                fs.copyFileSync(srcPath, destPath)
                if (!fs.existsSync(destPath)) {
                    throw new Error("Copy failed: " + destPath)
                }
            }
        }
    }
}

export function viteDracoPlugin() {
    return [viteDracoPluginServe(), viteDracoPluginBuild()]
}
