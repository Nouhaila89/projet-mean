import { CategoryModel } from "../../admin-category/models/category.model";

export class ProductModel{
    _id: string = "";
    name: string = "";
    categories: CategoryModel[] = [];
    stockS: number = 0;
    stockM: number = 0;
    stockX: number = 0;
    stockXl: number = 0;
    price: number = 0;
    description: string = "";
    isActive: boolean = true;
    createdDate: string = "";
    imageUrls: any[] = [];
}