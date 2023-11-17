import { useAppState } from "../store"
import { CardboardBox } from "./CardboardBox"
import { useFrame } from "@glowbuzzer/store"

export const Pallet = () => {
    const { placed, placement } = useAppState()
    const { translation: p } = useFrame(2)

    // ensure we don't exceed the number of placements we've been given
    const num_placed = Math.min(placed, placement.length)

    return Array.from({ length: num_placed }).map((_, i) => {
        const { x, y, z, rotated } = placement[i]
        return (
            <CardboardBox key={i} position={[p.x + x, p.y + y, p.z + z + 75]} rotated={rotated} />
        )
    })
}
