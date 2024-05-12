import { ProductModel } from "../../admin-products/models/product.model";

export class OrderModel{
    _id: string = "";
    productId: string = "";
    products: ProductModel[] = [];
    price: number = 0;
    name: string = "";
    address: string = "";
    size: string = "";
    quantity: number = 0;
    createdDate: string = "";
    userId: string = "";
}