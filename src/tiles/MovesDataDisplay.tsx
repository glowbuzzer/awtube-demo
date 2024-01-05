import { useMemo } from "react"
import { grouped } from "./trajectory_100ms"
import { Table } from "antd"

export const MovesDataDisplay = () => {
    const columns = [
        {
            title: "Time",
            dataIndex: 0,
            key: "time"
        },
        ...[1, 2, 3, 4, 5, 6].map(i => ({
            title: `J${i} Pos`,
            dataIndex: i,
            key: `J${i} Pos`
        })),
        ...[1, 2, 3, 4, 5, 6].map(i => ({
            title: `J${i} Vel`,
            dataIndex: i + 6,
            key: `J${i} Vel`
        }))
    ]

    return useMemo(
        () =>
            grouped.map((group, i) => (
                <div key={i}>
                    <header>Move {i + 1}</header>
                    <Table
                        columns={columns}
                        size={"small"}
                        pagination={false}
                        dataSource={group.map(g => g.map(v => v.toFixed(2)))}
                        rowKey={(row, i) => i}
                    />
                </div>
            )),
        []
    )
}
