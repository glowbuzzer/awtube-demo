import { usePrefs } from "@glowbuzzer/store"
import * as React from "react"

export function get_codesandbox_websocket_url() {
    const hostname = window.location.hostname
    if (hostname.indexOf("csb.app") > 0) {
        return `wss://${hostname.replace("5173", "9001")}/ws`
    }
}

export function useCodeSandbox() {
    const { update } = usePrefs()
    React.useEffect(() => {
        // set the connect url to the GBC running in the docker container alongside vite but on port 9001
        const url = get_codesandbox_websocket_url()
        if (url) {
            // we're running in codesandbox
            update("url", url)
        }
    }, [])
}
