import axios, { AxiosRequestConfig } from "axios";

class WebService {
    private _baseUrl: string
    private _token: string

    constructor({ baseUrl, token }: { baseUrl: string, token: string }) {
        this._baseUrl = process.env.REACT_APP_API + baseUrl
        this._token = token
    }

    private _createHeader(): AxiosRequestConfig {
        return {
            headers: {
                Authorization: `Bearer ${this._token}`,
                "Content-type": "application/json"
            }
        }
    }

    async getPaged<T>(page = 0) {
        const take = 20
        const skip = page * take
        const { data } = await axios.get<T[]>(`${this._baseUrl}/${skip}/${take}`, this._createHeader())
        return data
    }

    async find<T>(id: number) {
        const { data } = await axios.get<T>(`${this._baseUrl}/${id}`, this._createHeader())
        return data
    }

    async save<T>(entity: T) {
        const { data } = await axios.post(this._baseUrl, this._createHeader())
        return data
    }
}


export const useWebService = (baseUrl: string, token: string) => new WebService({ baseUrl, token });