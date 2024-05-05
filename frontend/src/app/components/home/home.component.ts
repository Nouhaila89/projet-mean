import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { ProductService } from '../admin-products/services/product.service';
import { RequestModel } from '../../common/models/request.model';
import { ProductModel } from '../admin-products/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  request: RequestModel = new RequestModel();
  products: ProductModel[] = [];
  constructor(
    private _product: ProductService
  ){
    
  }
  ngOnInit(): void {
    this.getAll();
  }
  
  getAll(){
    this._product.getAllForHome(this.request, res=> this.products = res);

  }
}
