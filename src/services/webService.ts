import axios from "axios"
import { IPagedResult } from "."

export class WebService {
    private _baseUrl: string

    constructor({ baseUrl }: { baseUrl: string }) {
        this._baseUrl = process.env.REACT_APP_API_HTTP + baseUrl
    }

    async getPaged<T>(skip = 0, take = 0): Promise<IPagedResult<T>> {
        const { data } = await axios.get<IPagedResult<T>>(`${this._baseUrl}/${skip}/${take}`)
        return data
    }

    async find<T>(id: number) {
        const { data } = await axios.get<T>(`${this._baseUrl}/${id}`)
        return data
    }

    async save<T>(entity: T) {
        const { data } = await axios.post(this._baseUrl, entity)
        return data
    }

    async update<T>(id: number, entity: T) {
        const { data } = await axios.put(`${this._baseUrl}/${id}`, entity)
        return data
    }

    async delete(id: number) {
        const { data } = await axios.delete(`${this._baseUrl}/${id}`)
        return data
    }
}