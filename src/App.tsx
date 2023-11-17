import {
    CartesianDroTileDefinition,
    CartesianJogTileDefinition,
    ConnectTileDefinition,
    DockLayout,
    DockLayoutProvider,
    DockTileDefinitionBuilder,
    EmStatTileDefinition,
    FeedRateTileDefinition,
    FramesTileDefinition,
    JointDroTileDefinition,
    JointJogTileDefinition,
    JointTorqueModesTileDefinition,
    PointsTileDefinition,
    TelemetryTileDefinition
} from "@glowbuzzer/controls"
import * as React from "react"
import { AwRobotSceneTileDefinition } from "./AwRobotSceneTile"
import { AppMenu } from "./AppMenu"
import { AwTubeStatusTileDefinitionBuilder, RgbStateHandler } from "@glowbuzzer/awlib"
import { SimpleMoveTileDefinition } from "./SimpleMoveTile"
import { usePrefs } from "@glowbuzzer/store"
import { PalletisingTile } from "./PalletisingTile"

export function get_codesandbox_websocket_url() {
    const hostname = window.location.hostname
    if (hostname.indexOf("csb.app") > 0) {
        const wss = `wss://${hostname.replace("5173", "9001")}/ws`
        return wss
    }
}

const PalletisingTileDefinition = DockTileDefinitionBuilder()
    .id("palletising")
    .name("Palletising")
    .placement(2, 1)
    .render(() => <PalletisingTile />)
    .build()

export const App = () => {
    const { update } = usePrefs()
    React.useEffect(() => {
        // set the connect url to the GBC running in the docker container alongside vite but on port 9001
        const url = get_codesandbox_websocket_url()
        if (url) {
            // we're running in codesandbox
            update("url", url)
        }
    }, [])

    return (
        <>
            <RgbStateHandler />
            <DockLayoutProvider
                tiles={[
                    ConnectTileDefinition,
                    AwRobotSceneTileDefinition,
                    CartesianDroTileDefinition,
                    JointDroTileDefinition,
                    CartesianJogTileDefinition,
                    JointJogTileDefinition,
                    TelemetryTileDefinition,
                    PointsTileDefinition,
                    FramesTileDefinition,
                    FeedRateTileDefinition,
                    AwTubeStatusTileDefinitionBuilder({
                        showSoftwareStop: false,
                        showToolInputs: false,
                        showToolOutputs: true
                    }),
                    SimpleMoveTileDefinition,
                    JointTorqueModesTileDefinition,
                    EmStatTileDefinition,
                    PalletisingTileDefinition
                ]}
            >
                <AppMenu />
                <DockLayout />
            </DockLayoutProvider>
        </>
    )
}
