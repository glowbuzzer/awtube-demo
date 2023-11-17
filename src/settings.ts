import { PalletPlacement } from "./store"
import { Vector3 } from "three"

export const box_h = 150
const box_l = 182
const box_w = 168
const row2_offset = -35

// generate a standard pallet placement
const first_layer: PalletPlacement[] = [
    {
        x: 0,
        y: 0,
        z: 0,
        rotated: true
    },
    {
        x: 0,
        y: box_l,
        z: 0,
        rotated: true
    },
    {
        x: 0,
        y: box_l * 2,
        z: 0,
        rotated: true
    },
    {
        x: box_w,
        y: row2_offset,
        z: 0,
        rotated: false
    },
    {
        x: box_w,
        y: row2_offset + box_w - 15,
        z: 0,
        rotated: false
    },
    {
        x: box_w,
        y: row2_offset + (box_w - 15) * 2,
        z: 0,
        rotated: false
    },
    {
        x: box_w,
        y: row2_offset + (box_w - 15) * 3,
        z: 0,
        rotated: false
    }
]

// create second layer rotated 180 above the first
const second_layer = first_layer.map(p => {
    const v = new Vector3(p.x, p.y, p.z)
    v.applyAxisAngle(new Vector3(0, 0, 1), Math.PI)
    const { x, y, z } = v
    return { ...p, x: x + 180, y: y + 375, z: z + 152 }
})

export const default_pallet_placement = [...first_layer, ...second_layer]
