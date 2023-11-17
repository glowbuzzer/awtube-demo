import * as React from "react"
import { createRoot } from "react-dom/client"

import { GlowbuzzerApp } from "@glowbuzzer/controls"
import { App, get_codesandbox_websocket_url } from "./App"

import "antd/dist/reset.css"
import "dseg/css/dseg.css"
import "flexlayout-react/style/light.css"
import { config } from "./config"

const root = createRoot(document.getElementById("root")!)
const codesandbox = !!get_codesandbox_websocket_url()

root.render(
    <GlowbuzzerApp appName="awtube-demo" configuration={codesandbox ? undefined : config}>
        <App />
    </GlowbuzzerApp>
)
