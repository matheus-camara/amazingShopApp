import React from "react"
import axios from "axios"
import { useLoader } from "../contexts"
import { useStringLocalizer } from "../contexts/localization"
import { useSnackbar } from "notistack"
import { Notification } from "../domain"

export const Interceptor: React.FC<any> = (props) => {

    const setLoading = useLoader();
    const localizer = useStringLocalizer();
    const { enqueueSnackbar } = useSnackbar();

    const handleUnauthorize = () => enqueueSnackbar(localizer.get("unAuthorized"), { variant: "error" })
    const handleNotFound = () => enqueueSnackbar(localizer.get("notFound"), { variant: "warning" })
    const handleBadRequest = (data: Notification[]) => data.forEach(n => enqueueSnackbar(`${n.id}: ${n.value}`, { variant: "error" }))
    const handleServerUnavailable = () => enqueueSnackbar(localizer.get("serverUnavailable"), { variant: "warning" })

    const handleCreated = () => enqueueSnackbar(localizer.get("created"), { variant: "success" })

    const configureRequestInterceptor = () => {
        axios.interceptors.request.use(
            (request) => {
                request.headers["Accept-Language"] = localizer.Language
                setLoading(true)
                return request
            },
            (error) => setLoading(false)
        )

        axios.interceptors.response.use(
            (response) => {
                setLoading(false)
                switch (response?.status) {
                    case 201:
                        handleCreated()
                        break
                }
                return Promise.resolve(response)
            },
            (error) => {
                setLoading(false)
                if (!error.response) {
                    handleServerUnavailable();
                }
                switch (error.response?.status) {
                    case 400:
                        handleBadRequest(error.response.data)
                        break
                    case 401:
                        handleUnauthorize()
                        break
                    case 404:
                        handleNotFound()
                        break
                }
                return Promise.reject(error)
            })
    }

    configureRequestInterceptor();

    return null;
}
