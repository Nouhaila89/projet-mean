import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { ProductService } from '../admin-products/services/product.service';
import { ProductModel } from '../admin-products/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { BasketModel } from '../baskets/models/basket.model';
import { BasketService } from '../baskets/service/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-single',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.css'
})
export class ProductSingleComponent {
  productId: string = "";
  product: ProductModel = new ProductModel();
  selectedImage: string = '';
  thumbnailImages: string[] = [];

  constructor(
    private _product: ProductService,
    private _activated: ActivatedRoute,
    private _basket: BasketService,
    private _toastr: ToastrService
  ) {
    this._activated.params.subscribe(res=>{
      this.productId = res["value"];
      this.getById();
    })
  }

  changeImage(index: number) {
    this.selectedImage = this.thumbnailImages[index];
  }

  getById(){
    let model = {_id: this.productId};
    this._product.getById(model, res => {
      this.product = res;
      this.thumbnailImages = this.product.imageUrls.map(img => `http://localhost:5000/${img.path}`);
      this.selectedImage = this.thumbnailImages[0];
    });
  }

  addBasket(productId: string, price: number){
    let model = new BasketModel();
    model.productId = productId;
    model.price = price;
    model.quantity = 1;
    this._basket.add(model, res=> {
      this._toastr.success(res.message);
      this.getById();
    });
  }
}