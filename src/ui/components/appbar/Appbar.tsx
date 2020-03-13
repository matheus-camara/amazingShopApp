import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { useStringLocalizer } from "../../../contexts/localization"
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core"
import { AccountCircle, HomeOutlined } from "@material-ui/icons"
import { LanguageSelector } from ".."
import { Redirect } from "react-router-dom"
import { Routes } from "../../../constants/routes"

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
    const [auth] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const localizer = useStringLocalizer()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position={props.position} className={props.className}>
            <Toolbar>
                {props.children}
                <Typography variant="h6">
                    AmazingShop
                </Typography>
                <IconButton
                    aria-label="home button"
                    aria-controls="menu-appbar"
                    aria-haspopup="false"
                    onClick={() => <Redirect to={Routes.DASHBOARD_PAGE} />}
                    color="inherit"
                >
                    <HomeOutlined />
                </IconButton>
                <LanguageSelector />
                {auth && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>{localizer.get("profile")}</MenuItem>
                            <MenuItem onClick={handleClose}>{localizer.get("cart")}</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}
