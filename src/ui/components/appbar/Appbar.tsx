import React from "react"
import { AppBar, Toolbar, Typography, IconButton, Avatar, makeStyles, Tooltip } from "@material-ui/core"
import { LanguageSelector } from ".."
import { } from "@material-ui/core/colors"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { IRootState } from "../../../stores"
import { Routes } from "../../../constants/routes"
import { ExitToAppOutlined } from "@material-ui/icons"
import { UserStoreActions } from "../../../actions"
import { useStringLocalizer } from "../../../contexts"

interface IAppbarProps {
    position: "static" | "fixed" | "absolute" | "relative" | "sticky" | undefined
    className?: any
    children?: any
}

const useStyles = makeStyles({
    circleAvatar: {
        color: '#fff',
        backgroundColor: "black",
    },
})

export const Appbar: React.FC<IAppbarProps> = (props) => {

    const history = useHistory()
    const auth = useSelector<IRootState>(x => x.authentication.authenticated) as boolean
    const classes = useStyles()
    const dispatch = useDispatch()
    const localizer = useStringLocalizer()

    return (
        <AppBar position={props.position} className={props.className}>
            <Toolbar>
                {props.children}
                <Typography variant="h6">
                    AmazingShop
					</Typography>
                <LanguageSelector />
                <Tooltip title={localizer.get(auth ? "profile" : "login")} arrow placement="right">
                    <IconButton
                        onClick={() => auth ? null : history.push(Routes.LOGIN_PAGE)}
                    >
                        <Avatar className={classes.circleAvatar}>
                        </Avatar>
                    </IconButton>
                </Tooltip>
                {
                    auth ?
                        <Tooltip title={localizer.get("logout")} arrow placement="right">
                            <IconButton
                                onClick={() => dispatch({
                                    type: UserStoreActions.Logout
                                })}
                            >
                                <ExitToAppOutlined>
                                </ExitToAppOutlined>
                            </IconButton>
                        </Tooltip>
                        : null
                }
            </Toolbar>
        </AppBar>
    )
}
