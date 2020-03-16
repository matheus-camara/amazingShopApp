import React from "react"
import { makeStyles, Theme, createStyles, MenuItem, Menu } from "@material-ui/core"
import { LanguageOutlined } from "@material-ui/icons"
import { Brasil_flag, Eua_flag } from "../../../static/images"
import { useSetLanguage, SupportedLanguages } from "../../../contexts"

const useStyles = makeStyles((theme: Theme) => createStyles({
    menuWrapper: {
        height: 60,
        width: 60,
        display: "flex",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center"
    },
    flagIcon: {
        height: "100%"
    },
    menuItem: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        color: "#88d0ef",
        borderRadius: "50%",
        border: "1px solid"
    }
}))


export const LanguageSelector: React.FC<any> = (props) => {

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | SVGElement | unknown>(null)
    const setLanguage = useSetLanguage()

    return (
        <div className={classes.menuWrapper}>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl as Element}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem className={classes.menuItem} onClick={() => {
                    setLanguage(SupportedLanguages.enUS)
                    setAnchorEl(null)
                }}>
                    <img
                        className={classes.flagIcon}
                        alt="english"
                        src={Eua_flag}
                    />
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={() => {
                    setLanguage(SupportedLanguages.ptBR)
                    setAnchorEl(null)
                }}>
                    <img
                        className={classes.flagIcon}
                        alt="português"
                        src={Brasil_flag}
                    />
                </MenuItem>
            </Menu>
            <LanguageOutlined
                className={classes.icon}
                onClick={(event) => setAnchorEl(event.target)}
            />
        </div>
    )
}