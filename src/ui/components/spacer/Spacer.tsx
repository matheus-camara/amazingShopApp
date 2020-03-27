import React from "react"
import { makeStyles } from "@material-ui/core"

export interface ISpacerProps {
    height: number | string
    width?: number | string
    display?: "inline" | "flex" | "block" | "inline-flex" | "inline-block"
}

const useStyles = ({ height, width, display }: { height: number | string, width: number | string, display: string }) => makeStyles({
    div: {
        height,
        width,
        display
    }
})()

export const Spacer: React.FC<ISpacerProps> = (props) => {

    const classes = useStyles({
        height: props.height,
        width: props.width ?? "100%",
        display: props.display ?? "flex"
    })

    return <div className={classes.div}>

    </div>
}