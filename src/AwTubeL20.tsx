import {
    AwTubeRobot,
    AwTubeRobotParts,
    Base,
    Clamp,
    Joint,
    Link,
    Monobraccio,
    Plate,
    Spindle,
    useLoadedRobotPartsWithEmbeddedAssets
} from "@glowbuzzer/awlib"
import { TriadHelper } from "@glowbuzzer/controls"

import BASE_MM219 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/bases/base_219.glb"
import JOINT_J40LP from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/joints/joint_j40_lp.glb"
import JOINT_J40HP from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/joints/joint_j40_hp.glb"
import JOINT_J32 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/joints/joint_j32.glb"
import JOINT_J25 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/joints/joint_j25.glb"
import JOINT_J20 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/joints/joint_j20.glb"
import PLATE_J25 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/plates/plate_j25.glb"
import PLATE_J40 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/plates/plate_j40.glb"
import LINK_L125_314 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/links/link_125_314.glb"
import LINK_L100_294 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/links/link_100_294.glb"
import CLAMP_J40_J40 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/clamps/clamp_j40_j40.glb"
import CLAMP_J32_J25 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/clamps/clamp_j32_j25.glb"
import MONOB_M220 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/monobraccios/monobraccio_220.glb"
import SPINDLE_M112 from "remote://static.glowbuzzer.com/assets/models/aw/awtube-parts-v2/spindles/spindle_112.glb"

const imported = [
    BASE_MM219,
    JOINT_J40LP,
    JOINT_J40HP,
    JOINT_J32,
    JOINT_J25,
    JOINT_J20,
    PLATE_J40,
    PLATE_J25,
    LINK_L100_294,
    LINK_L125_314,
    CLAMP_J32_J25,
    CLAMP_J40_J40,
    MONOB_M220,
    SPINDLE_M112
]

const definition: AwTubeRobotParts = {
    b0: Base.MM219,
    j0: Joint.J40LP,
    p0: Plate.J40,
    c0: Clamp.J40_J40,
    j1: Joint.J40HP,
    l0: Link.L125_314,
    j2: Joint.J32,
    c1: Clamp.J32_J25,
    j3: Joint.J25,
    p1: Plate.J25,
    l1: Link.L100_294,
    j4: Joint.J25,
    p2: Plate.J25,
    m0: Monobraccio.M220,
    j5: Joint.J20,
    s0: Spindle.M112
}

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

    // return <PartGrid parts={parts} />
    return <AwTubeRobot parts={parts}>{children}</AwTubeRobot>
}
