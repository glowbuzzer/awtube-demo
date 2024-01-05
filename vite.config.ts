/*
 * Copyright (c) 2022. Glowbuzzer. All rights reserved
 */

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteDracoPlugin } from "./vite-draco-plugin"

export default defineConfig({
    plugins: [react(), viteDracoPlugin()]
})
