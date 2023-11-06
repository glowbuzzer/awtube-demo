import {PreferencesDialog, useDockViewMenu} from "@glowbuzzer/controls"
import { Menu } from "antd"
import * as React from "react"
import styled from "styled-components"
import {useState} from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";

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
    const [showPrefs, setShowPrefs] = useState(false)

    const menuItems: ItemType[] = [
        {
            key: "file",
            label: "File",
            children: [
                {
                    key: "file-preferences",
                    label: "Preferences",
                    onClick: () => setShowPrefs(true)
                }
            ]
        },
        viewMenu
    ]

    return (
        <StyledDiv>
            <PreferencesDialog open={showPrefs} onClose={() => setShowPrefs(false)} />
            <img src="/images/logo.png" alt="logo" width={200} />
            <Menu mode="horizontal" selectedKeys={[]} items={menuItems} />
        </StyledDiv>
    )
}
