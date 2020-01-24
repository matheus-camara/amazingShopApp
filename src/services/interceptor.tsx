import React from "react"
import axios from "axios"
import { useLoader } from "../contexts"

export const Interceptor: React.FC<any> = (props) => {

    const setLoading = useLoader();

    const configureRequestInterceptor = () => {
        axios.interceptors.request.use((config) => {

            setLoading(true);

            return config
        }, (error) => {
            setLoading(false)
        })

        axios.interceptors.response.use((response) => {

            setLoading(false)
            return response

        }, (error) => {

            setLoading(false)

            return Promise.reject(error)
        })
    }

    configureRequestInterceptor();

    return null;
}
