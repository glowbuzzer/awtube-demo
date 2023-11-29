/*
 * Copyright (c) 2023. Glowbuzzer. All rights reserved
 */

import { Button, Space } from "antd"
import { useIntegerOutputState, useStream } from "@glowbuzzer/store"

function delay() {
    return new Promise(resolve => setTimeout(resolve, 250))
}

export const SimpleMoveTile = () => {
    const { execute } = useStream(0)
    const [, setColour] = useIntegerOutputState(0)

    async function go() {
        const edge = 100
        setColour(0xff0000, true) // green
        await execute(api => [
            api
                .moveToPosition()
                .translation(800, -edge / 2, 650)
                .rotationEuler(Math.PI, Math.PI / 3, 0)
                .configuration(0)
                .promise()
                .then(() => setColour(0x0000ff, true)), // turn blue
            api.moveLine(-edge).relative(),
            api.moveLine(0, edge).relative(),
            api.moveLine(edge, 0).relative(),
            api.moveLine(0, -edge).relative(),
            api.setIout(0, 0xff0000)
        ])

        for (let n = 0; n < 5; n++) {
            setColour(0x000000, true) // black
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
