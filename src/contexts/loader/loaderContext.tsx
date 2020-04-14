import React from "react"
import { Interceptor } from "../../services"
import { Loader } from "../../ui/components"

const ToggleLoaderContext = React.createContext<((show: boolean) => void) | null>(null)

export const LoaderProvider = ({ children, interceptorKey }: { children?: any, interceptorKey?: string }) => {
    const [loading, setLoading] = React.useState(false)

    return (
        <>
            <Loader showLoader={loading} />
            <ToggleLoaderContext.Provider value={setLoading}>
                <Interceptor key={interceptorKey} />
            </ToggleLoaderContext.Provider>
            {children ? children : null}
        </>
    )
}

export const useLoader = () => {
    const loader = React.useContext(ToggleLoaderContext)
    if (!loader) {
        throw new Error("useLoader must be used within a LoaderProvider")
    }

    return loader
}