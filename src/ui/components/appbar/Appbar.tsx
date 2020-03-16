import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { useStringLocalizer } from "../../../contexts/localization"
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core"
import { AccountCircle, HomeOutlined } from "@material-ui/icons"
import { LanguageSelector } from ".."

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2)
        }
    })
)

interface IAppbarProps {
    position: "static" | "fixed" | "absolute" | "relative" | "sticky" | undefined
    className?: any
    children?: any
}

export const Appbar: React.FC<IAppbarProps> = (props) => {
    const classes = useStyles()

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
