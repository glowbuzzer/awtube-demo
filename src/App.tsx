import {
    CartesianDroTileDefinition,
    CartesianJogTileDefinition,
    ConnectTileDefinition,
    DockLayout,
    DockLayoutProvider,
    FramesTileDefinition,
    JointDroTileDefinition,
    JointJogTileDefinition,
    PointsTileDefinition,
    TelemetryTileDefinition
} from "@glowbuzzer/controls"
import * as React from "react"
import { AwRobotSceneTileDefinition } from "./AwRobotSceneTile"
import { AppMenu } from "./AppMenu"
import { AwTubeStatusTileDefinitionBuilder } from "@glowbuzzer/awlib"

export const App = () => {
    return (
        <>
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
                    AwTubeStatusTileDefinitionBuilder({
                        showSoftwareStop: true,
                        showToolInputs: true,
                        showToolOutputs: true
                    })
                ]}
            >
                <AppMenu />
                <DockLayout />
            </DockLayoutProvider>
        </>
    )
}
