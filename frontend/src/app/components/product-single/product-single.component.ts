import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { ProductService } from '../admin-products/services/product.service';
import { ProductModel } from '../admin-products/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { BasketModel } from '../baskets/models/basket.model';
import { BasketService } from '../baskets/service/basket.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewsService } from './services/reviews.service';
import { NgForm } from '@angular/forms';
import { ReviewsModel } from './models/reviews.model';

@Component({
  selector: 'app-product-single',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.css'
})
export class ProductSingleComponent implements OnInit{
  productId: string = "";
  product: ProductModel = new ProductModel();
  selectedImage: string = '';
  thumbnailImages: string[] = [];
  selectedSize: string = '';
  reviews: ReviewsModel[] = []

  constructor(
    private _product: ProductService,
    private _activated: ActivatedRoute,
    private _basket: BasketService,
    private _toastr: ToastrService,
    private _reviews: ReviewsService
  ) {

  }
  ngOnInit(): void {
    this._activated.params.subscribe(res=>{
      this.productId = res["value"];
      this.getById();
    });
    this._reviews.getAllReviews(this.productId, res => this.reviews = res);

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
      this.selectSize('S');
    });
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  addBasket(productId: string, price: number){
    let model = new BasketModel();
    model.productId = productId;
    model.price = price;
    model.quantity = 1;
    model.selectedSize = this.selectedSize;
    this._basket.add(model, res=> {
      this._toastr.success(res.message);
      this.getById();
      return false;
    });
  }

  addReviews(form: NgForm, productId : string){
    if(form.valid){
      let review = new ReviewsModel(); 
      review.name = form.value["name"]; 
      review.description = form.value["description"]; 
      review.productId = productId;

      this._reviews.add(review, res=>{
        this._toastr.success(res.message);
        form.reset();
      });
    }
  }
}