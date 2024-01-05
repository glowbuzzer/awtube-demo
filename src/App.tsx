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
    IntegerOutputsTileDefinition,
    JointDroTileDefinition,
    JointJogTileDefinition,
    JointTorqueModesTileDefinition,
    PointsTileDefinition,
    TelemetryTileDefinition,
    ThreeDimensionalSceneTileDefinition
} from "@glowbuzzer/controls"
import * as React from "react"
import { AwRobotSceneTile } from "./tiles/AwRobotSceneTile"
import { AppMenu } from "./AppMenu"
import { AwTubeStatusTileDefinitionBuilder, RgbStateHandler } from "@glowbuzzer/awlib"
import { SimpleMoveTile } from "./tiles/SimpleMoveTile"
import { useCodeSandbox } from "./util"
import { InterpolatedMoveTile } from "./tiles/InterpolatedMoveTile"

const AwRobotSceneTileDefinition = DockTileDefinitionBuilder(ThreeDimensionalSceneTileDefinition)
    .render(() => <AwRobotSceneTile />)
    .build()

const SimpleMoveTileDefinition = DockTileDefinitionBuilder()
    .id("aw-simple-move")
    .name("Simple Move")
    .placement(2, 1)
    .render(() => <SimpleMoveTile />)
    .build()

const InterpolatedMoveTileDefinition = DockTileDefinitionBuilder()
    .id("aw-interpolated-move")
    .name("Interpolated Move")
    .placement(2, 1)
    .render(() => <InterpolatedMoveTile />)
    .build()

export const App = () => {
    useCodeSandbox()

    return (
        <>
            <RgbStateHandler />
            <DockLayoutProvider
                tiles={[
                    AwTubeStatusTileDefinitionBuilder({
                        showSoftwareStop: false,
                        showToolInputs: false,
                        showToolOutputs: true
                    }),
                    SimpleMoveTileDefinition,
                    InterpolatedMoveTileDefinition,
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
                    JointTorqueModesTileDefinition,
                    EmStatTileDefinition,
                    IntegerOutputsTileDefinition
                ]}
            >
                <AppMenu />
                <DockLayout />
            </DockLayoutProvider>
        </>
    )
}
