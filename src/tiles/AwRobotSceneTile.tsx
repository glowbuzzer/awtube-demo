import React from "react"
import { ThreeDimensionalSceneTile } from "@glowbuzzer/controls"
import { AwTubeL2 } from "../scene/AwTubeL2"
import { Environment } from "@react-three/drei"
import { PlaneShinyMetal } from "../scene/PlaneShinyMetal"

export const AwRobotSceneTile = () => {
    return (
        <ThreeDimensionalSceneTile hidePreview>
            <AwTubeL2 />
            <PlaneShinyMetal />
            <Environment files="/assets/environment/aerodynamics_workshop_1k.hdr" />
        </ThreeDimensionalSceneTile>
    )
}
