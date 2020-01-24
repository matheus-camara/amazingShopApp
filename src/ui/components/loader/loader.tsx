import React from "react"
import "./loader.css"

export const Loader: React.FC<{ showLoader: boolean }> = (props) => {

    const getClasses = () => `loading ${props.showLoader ? "show-loader" : "hide-loader"}`

    return (
        <div id="loading" className={getClasses()}>
            <div id="load" className={getClasses()}>
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
        </div>
    )
}