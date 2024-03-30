import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from '../admin-category/models/category.model';
import { CategoryService } from '../admin-category/services/category.service';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from '../admin-products/services/product.service';
import { ProductModel } from '../admin-products/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  categories: CategoryModel[] = [];
  request: RequestModel = new RequestModel();
  products: ProductModel[] = [];

  constructor(
    private _category: CategoryService,
    private _product: ProductService
  ){
    
  }
  ngOnInit(): void {
    this.getCategories();
    this.getAll();
  }
  
  getAll(){
    this._product.getAllForHomePage(this.request, res=> this.products = res);

  }
  
  getCategories(){
    this._category.getAll(res => this.categories = res);
  }

  changeCategory(categoryId:string, categoryName: string){
    this.request.categoryName = categoryName;
    this.request.categoryId = categoryId;
    this.getAll();
  }
}
