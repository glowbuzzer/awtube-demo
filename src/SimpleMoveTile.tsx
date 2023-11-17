/*
 * Copyright (c) 2023. Glowbuzzer. All rights reserved
 */

import { DockTileDefinitionBuilder } from "@glowbuzzer/controls"
import { Button, Space } from "antd"
import { useIntegerOutputState, useStream } from "@glowbuzzer/store"

function delay() {
    return new Promise(resolve => setTimeout(resolve, 250))
}
export const SimpleMoveTile = () => {
    const { send } = useStream(0)
    const [, setColour] = useIntegerOutputState(0)

    async function go() {
        await send(api => [
            api
                .moveToPosition()
                .translation(800, 150, 650)
                .rotationEuler(Math.PI, Math.PI / 3, 0)
                .configuration(0)
                .promise()
                .then(() => setColour(0x0000ff, true)), // turn blue
            api.moveLine(-50).relative().promise(),
            api.moveLine(0, 50).relative().promise(),
            api.moveLine(50, 0).relative().promise(),
            api.moveLine(0, -50).relative().promise()
        ])
        for (let n = 0; n < 5; n++) {
            setColour(0x000000, true)
            await delay()
            setColour(0xff0000, true) // green
            await delay()
        }
    }

    return (
        <div style={{ padding: "10px" }}>
            <Space direction="vertical">
                <div>Click the button below to perform move</div>
                <Button size="small" onClick={go}>
                    PERFORM MOVE
                </Button>
            </Space>
        </div>
    )
}

export const SimpleMoveTileDefinition = DockTileDefinitionBuilder()
    .id("aw-simple-move")
    .name("Simple Move")
    .render(() => <SimpleMoveTile />)
    .build()
