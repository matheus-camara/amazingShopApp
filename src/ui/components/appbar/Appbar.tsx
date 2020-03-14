import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { LanguageSelector } from ".."

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
)

interface IAppbarProps {
    position: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined
    className?: string
    children?: any
}

export const Appbar: React.FC<IAppbarProps> = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position={props.position} className={props.className}>
                <Toolbar>
                    {props.children}
                    <Typography variant="h6" className={classes.title}>
                        AmazingShop
					</Typography>
                    <LanguageSelector />
                </Toolbar>
            </AppBar>
        </div>
    )
}
