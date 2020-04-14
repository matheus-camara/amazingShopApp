import axios, { AxiosRequestConfig } from "axios"
import { IPagedResult } from "."
import { buildQueryString } from "../helpers"

export class WebService {
    private _baseUrl: string

    constructor({ baseUrl }: { baseUrl: string }) {
        this._baseUrl = process.env.REACT_APP_API_HTTP + baseUrl
    }

    private createHeader(token?: string): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        return config;
    }

    async getPaged<T>({ skip, take, token, queryParams }: { skip: number, take: number, token?: string, queryParams?: object | string | null }): Promise<IPagedResult<T>> {
        let finalurl = `${this._baseUrl}/${skip}/${take}`

        if (!!queryParams && queryParams as string)
            finalurl += queryParams

        else if (!!queryParams && queryParams as object)
            finalurl = finalurl + buildQueryString(queryParams)

        const { data } = await axios.get<IPagedResult<T>>(finalurl, this.createHeader(token))
        return data
    }

    async find<T>(id: number, token?: string) {
        const { data } = await axios.get<T>(`${this._baseUrl}/${id}`, this.createHeader(token))
        return data
    }

    async post<T>(entity: T, resource: string, token?: string) {
        const { data } = await axios.post(`${this._baseUrl}/${resource}`, entity, this.createHeader(token))
        return data
    }

    async delete(id: number, token?: string) {
        const { data } = await axios.delete(`${this._baseUrl}/${id}`, this.createHeader(token))
        return data
    }

    async save<T>(entity: T, token?: string) {
        const { data } = await axios.post(this._baseUrl, entity, this.createHeader(token))
        return data
    }

    async update<T>(id: number, entity: T, token?: string) {
        const { data } = await axios.put(`${this._baseUrl}/${id}`, entity, this.createHeader(token))
        return data
    }
}