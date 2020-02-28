import React from "react"
import { Interceptor } from "../../services"
import { Loader } from "../../ui/components"

const ToggleLoaderContext = React.createContext<((show: boolean) => void) | null>(null)

export const LoaderProvider = ({ children }: { children: any }) => {
    const [loading, setLoading] = React.useState(false)

    return (
        <div>
            <Loader showLoader={loading} />
            <ToggleLoaderContext.Provider value={setLoading}>
                <Interceptor />
            </ToggleLoaderContext.Provider>
            {children}
        </div>
    )
}

export const useLoader = () => {
    const loader = React.useContext(ToggleLoaderContext)
    if (!loader) {
        throw new Error("useLoader must be used within a LoaderProvider")
    }

    return loader
}