import {
    DockTileDefinitionBuilder,
    ThreeDimensionalSceneTile,
    ThreeDimensionalSceneTileDefinition
} from "@glowbuzzer/controls"
import { AwTubeL20 } from "./AwTubeL20"
import { Environment } from "@react-three/drei"
import { PlaneShinyMetal } from "./PlaneShinyMetal"
import { LightCurtain } from "./LightCurtain"

export const AwRobotSceneTile = () => {
    return (
        <ThreeDimensionalSceneTile hidePreview hideTrace>
            <AwTubeL20 />
            <Environment files="/assets/environment/aerodynamics_workshop_1k.hdr" />
            <PlaneShinyMetal />
            <LightCurtain />
        </ThreeDimensionalSceneTile>
    )
}

export const AwRobotSceneTileDefinition = DockTileDefinitionBuilder(
    ThreeDimensionalSceneTileDefinition
)
    .render(() => <AwRobotSceneTile />)
    .build()
