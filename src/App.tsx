import React from "react"
import "./App.css"
import { StringLocalizerProvider, SupportedLanguages } from "./contexts/localization"
import { resources } from "./static/Resources"
import { LoaderProvider } from "./contexts/loader/loaderContext"
import { SnackbarProvider } from "notistack"
import { AppRouter } from "./ui/components"
import { app_routes } from "./constants/routes"

const App: React.FC = () => {

    return (
        <div className="App">
            <StringLocalizerProvider resources={resources} defaultLanguage={SupportedLanguages.enUS}>
                <SnackbarProvider maxSnack={5} preventDuplicate={true} anchorOrigin={{ horizontal: "right", vertical: "top" }} autoHideDuration={3000}>
                    <LoaderProvider>
                        <AppRouter routes={app_routes}></AppRouter>
                    </LoaderProvider>
                </SnackbarProvider>
            </StringLocalizerProvider>
        </div>
    )
}

export default App
