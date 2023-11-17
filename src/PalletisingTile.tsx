import { useEffect, useState } from "react"
import { Button, Space, Tag } from "antd"
import {
    MachineState,
    useConnection,
    useFeedRate,
    useMachineState,
    useStream
} from "@glowbuzzer/store"
import { appSlice, PalletPlacement, useAppState } from "./store"
import { useDispatch } from "react-redux"
import { box_h, default_pallet_placement } from "./settings"

enum PalletisingState {
    READY,
    RUNNING,
    COMPLETED,
    ERROR
}

export const PalletisingTile = () => {
    const [state, setState] = useState(PalletisingState.READY)
    const { send, reset: reset_stream } = useStream(0)
    const dispatch = useDispatch()
    const { placement } = useAppState()
    const { setFeedRatePercentage, froTarget } = useFeedRate(0)
    const { connected } = useConnection()
    const machineState = useMachineState()

    const can_move = connected && machineState === MachineState.OPERATION_ENABLED

    useEffect(() => {
        if (!can_move) {
            // we dropped out of OP
            reset()
        }
    }, [can_move])

    useEffect(() => {
        // for now we only support one layout
        dispatch(appSlice.actions.configure(default_pallet_placement))
    }, [])

    function reset() {
        dispatch(appSlice.actions.reset())
        setState(PalletisingState.READY)
    }

    async function pick_next() {
        await send(api => [
            api
                .moveToPosition(300, -400, box_h + 100)
                .rotation(1, 0, 0, 0)
                .configuration(0)
                .frameIndex(0)
                .promise(),
            api
                .moveLine(0, 0, -100)
                .relative()
                .promise()
                .then(() => {
                    dispatch(appSlice.actions.pick())
                }),
            api.moveLine(0, 0, 175).relative().promise()
        ])
    }

    async function place_next(p: PalletPlacement) {
        await send(api => [
            api
                .moveToPosition(p.x, p.y, p.z + box_h * 2 + 100)
                .rotationEuler(Math.PI, 0, p.rotated ? Math.PI / 2 : 0)
                .configuration(0)
                .frameIndex(2)
                .promise(),
            api
                .moveLine(0, 0, -(box_h + 100))
                .relative()
                .promise()
                .then(() => {
                    dispatch(appSlice.actions.place())
                }),
            api.moveLine(0, 0, 175).relative().promise()
        ])
    }

    function place_first() {
        return place_next(placement[0])
    }

    async function run() {
        reset_stream()
        setState(PalletisingState.RUNNING)
        for (const p of placement) {
            await pick_next()
            await place_next(p)
        }
        setState(PalletisingState.COMPLETED)
    }

    function toggle_fast() {
        setFeedRatePercentage(froTarget > 1 ? 1 : 5)
    }

    return (
        <div style={{ padding: "10px" }}>
            <Tag color={state === PalletisingState.RUNNING ? "red" : "green"}>
                {PalletisingState[state]}
            </Tag>

            <Space>
                <Button size="small" onClick={run} disabled={state !== PalletisingState.READY}>
                    GO
                </Button>
                <Button
                    size="small"
                    onClick={reset}
                    disabled={state !== PalletisingState.COMPLETED}
                >
                    RESET
                </Button>

                <Button size="small" onClick={toggle_fast}>
                    {froTarget > 1 ? "NORMAL SPEED" : "FAST"}
                </Button>
            </Space>
        </div>
    )
}
