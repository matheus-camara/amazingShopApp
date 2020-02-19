import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useStringLocalizer } from "../../../localization";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon, HomeOutlined } from "@material-ui/icons";
import { LanguageSelector } from "../languageSelector/languageSelector";
import { Redirect } from "react-router-dom";
import { DASHBOARD_PAGE } from "../../../constants/routes";

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
);

interface IAppbarProps { }

export const Appbar: React.FC<IAppbarProps> = (props) => {
    const classes = useStyles();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const localizer = useStringLocalizer();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => null}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        AmazingShop
					</Typography>
                    <IconButton
                        aria-label="home button"
                        aria-controls="menu-appbar"
                        aria-haspopup="false"
                        onClick={() => <Redirect to={DASHBOARD_PAGE} />}
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
        </div>
    );
};
