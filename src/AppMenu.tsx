import { useDockViewMenu } from "@glowbuzzer/controls"
import { Menu } from "antd"
import * as React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
    display: flex;

    img {
        border-bottom: 1px solid ${props => props.theme.colorBorderSecondary};
    }
    .ant-menu {
        flex-grow: 1;
    }
`

export const AppMenu = () => {
    const viewMenu = useDockViewMenu()
    return (
        <StyledDiv>
            <img src="/images/logo.png" alt="logo" width={200} />
            <Menu mode="horizontal" selectedKeys={[]} items={[viewMenu]} />
        </StyledDiv>
    )
}
