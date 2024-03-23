import { CategoryModel } from "../../admin-category/models/category.model";

export class ProductModel{
    _id: string = "";
    name: string = "";
    categories: CategoryModel[] = [];
    stock: number = 0;
    price: number = 0;
    description: string = "";
    isActive: boolean = true;
    createdDate: string = "";
    imageUrls: any[] = [];
}