import {
    DockTileDefinitionBuilder,
    ThreeDimensionalSceneTile,
    ThreeDimensionalSceneTileDefinition
} from "@glowbuzzer/controls"
import { AwTubeL2 } from "./AwTubeL2"
import { Environment } from "@react-three/drei"
import { PlaneShinyMetal } from "./PlaneShinyMetal"

export const AwRobotSceneTile = () => {
    return (
        <ThreeDimensionalSceneTile hidePreview hideTrace>
            <AwTubeL2 />
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
