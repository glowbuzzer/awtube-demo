/*
 * Copyright (c) 2022. Glowbuzzer. All rights reserved
 */

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { remoteImport } from "./plugins/remote-import"

export default defineConfig({
    plugins: [react(), remoteImport()]
})
