export class Action<T> {
    public type: string
    public payload?: T

    constructor(type: string, payload?: T) {
        this.type = type
        this.payload = payload
    }
}

export class PagedAction<T> extends Action<T> {
    public skip: number
    public take: number
    public total: number

    constructor(skip: number, take: number, total: number, type: string, payload?: T) {
        super(type, payload)
        this.skip = skip;
        this.take = take;
        this.total = total;
    }
}