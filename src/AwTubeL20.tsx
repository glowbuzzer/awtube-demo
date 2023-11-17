import {
    AwTubeRobot,
    AwTubeRobotParts,
    Base,
    Clamp,
    Flange,
    Joint,
    Link,
    Monobraccio,
    Spindle,
    useLoadedRobotPartsWithEmbeddedAssets
} from "@glowbuzzer/awlib"
import { TriadHelper } from "@glowbuzzer/controls"

import BASE_MM219 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/bases/base_219.glb"
import JOINT_J32 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/joints/joint_j32.glb"
import JOINT_J25 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/joints/joint_j25.glb"
import JOINT_J20 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/joints/joint_j20.glb"
import LINK_MM127_302 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/links/link_127_302.glb"
import LINK_MM100_283 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/links/link_100_283.glb"
import FLANGE_J32 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/flanges/flange_j32.glb"
import FLANGE_J25 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/flanges/flange_j25.glb"
import CLAMP_J32_J32 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/clamps/clamp_j32_j32.glb"
import CLAMP_J32_J25 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/clamps/clamp_j32_j25.glb"
import MONOB_M220 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/monobraccios/monob_220.glb"
import SPINDLE_M112 from "remote://static.glowbuzzer.com/assets/models/aw/awtube/spindles/spindle_112.glb"

const definition: AwTubeRobotParts = {
    b0: Base.MM219,
    j0: Joint.J32,
    c0: Clamp.J32_J32,
    j1: Joint.J32,
    f0: Flange.J32,
    l0: Link.MM127_302,
    f1: Flange.J32,
    j2: Joint.J32,
    c1: Clamp.J32_J25,
    j3: Joint.J25,
    f2: Flange.J25,
    l1: Link.MM100_283,
    f3: Flange.J25,
    j4: Joint.J25,
    m0: Monobraccio.M220,
    j5: Joint.J20,
    s0: Spindle.M112
}

const imported = [
    BASE_MM219,
    JOINT_J32,
    JOINT_J25,
    JOINT_J20,
    LINK_MM127_302,
    LINK_MM100_283,
    FLANGE_J32,
    FLANGE_J25,
    CLAMP_J32_J25,
    CLAMP_J32_J32,
    MONOB_M220,
    SPINDLE_M112
]

const loader = (name: string) => {
    const found = imported.find(i => i.url.endsWith(name))
    if (!found) {
        throw new Error("not found: " + name)
    }
    return found
}

export const AwTubeL20 = ({ children }) => {
    const parts = useLoadedRobotPartsWithEmbeddedAssets(definition, loader)

    if (!parts) {
        // parts not loaded yet
        return null
    }

    return <AwTubeRobot parts={parts}>{children}</AwTubeRobot>
}
