/*
 * Copyright (c) 2023. Glowbuzzer. All rights reserved
 */

import { AwTubeLoadedRobotParts } from "@glowbuzzer/awlib"
import { TriadHelper } from "@glowbuzzer/controls"

export const PartGrid = ({ parts }: { parts: AwTubeLoadedRobotParts }) => {
    return Object.values(parts).map(function (part, index) {
        const x = index % 5
        const y = Math.floor(index / 5)
        return (
            <group key={index} position={[-1200 + x * 300, -1000 + y * 500, 100]} scale={1000}>
                <TriadHelper size={0.2} />
                <primitive object={part.object} />
            </group>
        )
    })
}
