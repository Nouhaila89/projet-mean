import { ProductModel } from "../../admin-products/models/product.model";


export class BasketModel{
    _id: string = "";
    userId: string = "";
    productId: string = "";
    products: ProductModel[] = [];
    price: number = 0;
    quantity: number = 1;
    selectedSize: string = "";
}