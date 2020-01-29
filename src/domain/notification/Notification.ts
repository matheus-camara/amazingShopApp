export class Notification {
    public id: string;
    public value: string;

    constructor({ id, value }: { id: string, value: string }) {
        this.id = id;
        this.value = value;
    }
}