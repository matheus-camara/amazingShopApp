export class Product {

    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;

    constructor({
        id,
        name,
        description,
        imageUrl,
        price
    }: {
        id: number,
        name: string,
        description: string,
        imageUrl: string,
        price: number
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price
    }
}