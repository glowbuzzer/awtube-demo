/*
 * Copyright (c) 2023. Glowbuzzer. All rights reserved
 */

import { combineReducers, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

export type PalletPlacement = {
    x: number
    y: number
    z: number
    rotated: boolean
}

const AVAILABLE = 14

export const appSlice = createSlice({
    name: "picknplace",
    initialState: {
        available: AVAILABLE,
        placed: 0,
        pick: false,
        placement: [] as PalletPlacement[]
    },
    reducers: {
        pick(state) {
            state.pick = true
            state.available--
        },
        place(state) {
            state.pick = false
            state.placed++
        },
        configure(state, action) {
            state.placement = action.payload
        },
        reset(state) {
            return {
                ...state,
                available: AVAILABLE,
                placed: 0,
                pick: false
            }
        }
    }
})

export const appReducers = { picknplace: appSlice.reducer }
const combinedAppReducer = combineReducers(appReducers)
export type AppState = ReturnType<typeof combinedAppReducer>

export function useAppState() {
    return useSelector((state: AppState) => state.picknplace)
}
