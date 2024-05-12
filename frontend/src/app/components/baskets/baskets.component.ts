import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../common/shared/shared.module';
import { SwalService } from '../../common/services/swal.service';
import { BasketModel } from './models/basket.model';
import { BasketService } from './service/basket.service';
import { PaymentService } from '../payment/service/payment.service';
import { Router } from '@angular/router';
import { CouponService } from '../admin-coupon/services/coupon.service';
import { CouponModel } from '../admin-coupon/models/coupon.model';


@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {
baskets: BasketModel[] = [];
coupons: CouponModel[] = [];
sum: number = 0;
couponName: string = ''; 

constructor(
  private _basket: BasketService,
  private _toastr: ToastrService,
  private _swal: SwalService,
  private _paymentService: PaymentService,
  private _router: Router,
  private _coupon: CouponService
){}

  ngOnInit(): void {
    this.getAll();
    this.getCoupon()
  }

getAll(){
  this._basket.getAll(res=> {
    this.baskets = res;
    this.calculate();
    this._paymentService.setSum(this.sum);
  });
}

calculate(){
  this.sum = 0;
  this.baskets.forEach(element=> {
    this.sum += (element.price * element.quantity)
  });
}

removeById(_id: string){
  this._swal.callSwal("Ürünü sepetten silmek istiyor musunuz?","Ürünü Sil","Sil",()=>{
    let model = {_id: _id};
    this._basket.removeById(model, res=> {
      this._toastr.info(res.message);
      this.getAll();
    });
  })  
}

removeById2(_id: string){
    let model = {_id: _id};
    this._basket.removeById(model, res=> {
      this.getAll();
    });
}

changeQuantity(index: number, action: string) {
  const basket = this.baskets[index];
  let newQuantity = basket.quantity;

  if (action === 'increase') {
    newQuantity++;
  } else if (action === 'decrease') {
    newQuantity--;
  }

  if (newQuantity === 0) {
    this.removeById2(basket._id);
    return;
  }

  if (action === 'increase' && this.isStockZero(basket)) {
    return;
  }

  basket.quantity = newQuantity;

  this._basket.updateQuantity(basket._id, newQuantity, res => {
    this.calculate();
    this._toastr.info(res.message);
    this.getAll();
  });
}

applyCoupon(couponName: string) {
  let found = false;
  let discountRate = 0;

  this.coupons.forEach(coupon => {
    if (coupon.name === couponName) {
      found = true;
      discountRate = coupon.discountRate;
    }
  });

  if (found) {
    if (discountRate > 0) {
      this.sum -= (this.sum * (discountRate / 100));
      this._toastr.success(`Kupon başarıyla uygulandı. İndirim oranı: ${discountRate}%`);
      this._paymentService.setSum(this.sum);
    } else {
      this._toastr.error('Kupon indirim oranı geçersiz.');
    }
  } else {
    this._toastr.error('Girilen kupon bulunamadı.');
  }
}


isStockZero(basket: BasketModel): boolean {
  return basket.selectedSize === 'S' && basket.products[0].stockS === 0 ||
    basket.selectedSize === 'M' && basket.products[0].stockM === 0 ||
    basket.selectedSize === 'X' && basket.products[0].stockX === 0 ||
    basket.selectedSize === 'XL' && basket.products[0].stockXl === 0;
}

kontrol(){
  let userString = localStorage.getItem("user");
  let user = JSON.parse(userString);
  if(user){
    this._router.navigateByUrl("payment")
  }
  else{
    this._router.navigateByUrl("login");
  }
}

getCoupon(){
  this._coupon.getAll(res => this.coupons = res);
}
}