import axios, { AxiosRequestConfig } from "axios"
import { IPagedResult } from "."

export class WebService {
    private _baseUrl: string
    private _token?: string | undefined

    constructor({ baseUrl, token }: { baseUrl: string, token?: string }) {
        this._baseUrl = process.env.REACT_APP_API_HTTP + baseUrl
        this._token = token
    }

    private _createHeader(): AxiosRequestConfig {
        const headers = {
            headers: {
                "Content-type": "application/json"
            }
        }

        return !this._token ? headers : Object.assign(headers, {
            Authorization: `Bearer ${this._token}`,
        })
    }

    async getPaged<T>(skip = 0, take = 0): Promise<IPagedResult<T>> {
        const { data } = await axios.get<IPagedResult<T>>(`${this._baseUrl}/${skip}/${take}`, this._createHeader())
        return data
    }

    async find<T>(id: number) {
        const { data } = await axios.get<T>(`${this._baseUrl}/${id}`, this._createHeader())
        return data
    }

    async save<T>(entity: T) {
        const { data } = await axios.post(this._baseUrl, entity, this._createHeader())
        return data
    }
}