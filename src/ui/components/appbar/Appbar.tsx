import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { LanguageSelector } from ".."

interface IAppbarProps {
    position: "static" | "fixed" | "absolute" | "relative" | "sticky" | undefined
    className?: any
    children?: any
}

export const Appbar: React.FC<IAppbarProps> = (props) => {

    return (
        <div>
            <AppBar position={props.position} className={props.className}>
                <Toolbar>
                    {props.children}
                    <Typography variant="h6">
                        AmazingShop
					</Typography>
                    <LanguageSelector />
                </Toolbar>
            </AppBar>
        </div>
    )
}
