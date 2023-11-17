import {
    DockTileDefinitionBuilder,
    ThreeDimensionalSceneTile,
    ThreeDimensionalSceneTileDefinition
} from "@glowbuzzer/controls"
import { AwTubeL20 } from "./AwTubeL20"
import { Environment } from "@react-three/drei"
import { PlaneShinyMetal } from "./PlaneShinyMetal"
import { CardboardBox } from "./scene/CardboardBox"
import { Conveyor } from "./scene/Conveyor"
import { useAppState } from "./store"
import { Pallet } from "./scene/Pallet"
import { Pillar } from "./scene/Pillar"

export const AwRobotSceneTile = () => {
    const { pick } = useAppState()

    return (
        <ThreeDimensionalSceneTile hidePreview hideTrace>
            <Conveyor />
            <Pillar>
                <AwTubeL20>{pick && <CardboardBox position={[0, 0, 75]} />}</AwTubeL20>
            </Pillar>
            <Pallet />
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
