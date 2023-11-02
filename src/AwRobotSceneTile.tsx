import {
    DockTileDefinitionBuilder,
    ThreeDimensionalSceneTile,
    ThreeDimensionalSceneTileDefinition
} from "@glowbuzzer/controls"
import { AwTubeL20 } from "./AwTubeL20"
import { Environment } from "@react-three/drei"
import { PlaneShinyMetal } from "./PlaneShinyMetal"

export const AwRobotSceneTile = () => {
    return (
        <ThreeDimensionalSceneTile>
            <AwTubeL20 />
            <Environment files="/assets/environment/aerodynamics_workshop_1k.hdr" />
            <PlaneShinyMetal />
        </ThreeDimensionalSceneTile>
    )
}

export const AwRobotSceneTileDefinition = DockTileDefinitionBuilder(
    ThreeDimensionalSceneTileDefinition
)
    .render(() => <AwRobotSceneTile />)
    .build()
