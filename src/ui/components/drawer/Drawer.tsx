import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Appbar } from "..";
import { CssBaseline, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, Typography, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { HomeOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import { useStringLocalizer } from '../../../contexts';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuListItem: {
            width: "100%",
            borderRadius: "0%"
        },
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            height: "100%",
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export const AppDrawer: React.FC = (props) => {
    const classes = useStyles();
    const stringLocalizer = useStringLocalizer();
    const { state } = useLocation() as any;
    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = React.useState(state?.drawerOpen ?? false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Appbar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
            </Appbar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem alignItems="center" button onClick={() => history.push(Routes.DASHBOARD_PAGE, { drawerOpen: open })}>
                        <ListItemIcon >
                            <HomeOutlined />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography autoCapitalize="true" align="justify" >
                                {stringLocalizer.get("dashboard")}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem alignItems="center" button onClick={() => history.push(Routes.ADD_PRODUCT_PAGE, { drawerOpen: open })}>
                        <ListItemIcon>
                            <AddBoxOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            {stringLocalizer.get("addProduct")}
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div >
    )
}
