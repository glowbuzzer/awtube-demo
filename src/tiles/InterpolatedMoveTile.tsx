import { MachineState, useMachine, useStream } from "@glowbuzzer/store"
import { grouped } from "./trajectory_100ms"
import { Button, Space } from "antd"
import styled from "styled-components"
import { useState } from "react"
import { MovesDataDisplay } from "./MovesDataDisplay"

/**
 * Convert the grouped move data to a single list of duration, position and velocity ready to stream.
 *
 * We ignore the first move in each group as it is the start position, and we use the time delta
 * between each entry to determine the duration of each streamed activity.
 */
const stream = grouped
    .map(group => {
        return group.slice(1).map((move, i) => {
            const prev = group[i]
            const dur = move[0] - prev[0] // duration of this segment
            const p = move.slice(1, 7) // joint positions
            const v = move.slice(7) // joint velocities
            return { dur, p, v }
        })
    })
    .flat() // combine groups into a single list

// extract the start position which is the first entry in the first group
const start = grouped[0][0].slice(1, 7)

const StyledDiv = styled.div`
    padding: 10px;

    header {
        margin: 10px;
        font-weight: bold;
    }
`

export const InterpolatedMoveTile = () => {
    const { execute } = useStream(0)
    const [ready, setReady] = useState(false)
    const { currentState } = useMachine()

    const op = currentState === MachineState.OPERATION_ENABLED // are we operation enabled?

    async function move_start() {
        await execute(api => api.moveJoints(start)).then(() => setReady(true))
    }

    async function run() {
        await execute(api =>
            stream.map(({ dur, p, v }) => api.moveJointsInterpolated(dur, p, v))
        ).then(() => setReady(false))
    }

    return (
        <StyledDiv>
            <Space direction="vertical">
                <Space>
                    <Button size="small" onClick={move_start} disabled={ready || !op}>
                        MOVE START
                    </Button>
                    <Button size="small" onClick={run} disabled={!ready || !op}>
                        RUN
                    </Button>
                </Space>
            </Space>
            <MovesDataDisplay />
        </StyledDiv>
    )
}
