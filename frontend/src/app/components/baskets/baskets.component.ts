import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../common/services/swal.service';
import { BasketModel } from './models/basket.model';
import { BasketService } from './service/basket.service';
import { PaymentService } from '../payment/service/payment.service';
import { Router } from '@angular/router';
import { CouponService } from '../admin-coupon/services/coupon.service';
import { CouponModel } from '../admin-coupon/models/coupon.model';
import { SharedModule } from '../../common/shared/shared.module';

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
  appliedCoupon: CouponModel | null = null;  // Variable pour stocker le coupon appliqué

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
    this.getCoupon();
  }

  getAll(){
    this._basket.getAll(res => {
      this.baskets = res;
      this.calculate();
      this._paymentService.setSum(this.sum);
    });
  }

  calculate(){
    this.sum = 0;
    this.baskets.forEach(element => {
      this.sum += (element.price * element.quantity);
    });
    this.applyTotalDiscount();
  }

  removeById(_id: string){
    this._swal.callSwal("Voulez-vous supprimer l'article du panier ?","Supprimer l'article","Supprimer",() => {
      let model = {_id: _id};
      this._basket.removeById(model, res => {
        this._toastr.info(res.message);
        this.getAll();
      });
    });  
  }

  removeById2(_id: string){
    let model = {_id: _id};
    this._basket.removeById(model, res => {
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
    if (this.appliedCoupon) {
      this._toastr.error('Un coupon a déjà été appliqué. Vous ne pouvez pas utiliser un autre coupon.');
      return;
    }

    let foundCoupon = this.coupons.find(coupon => coupon.name === couponName);

    if (foundCoupon) {
      this.appliedCoupon = foundCoupon;
      let discountRate = foundCoupon.discountRate;
      
      if (discountRate > 0) {
        this.sum -= (this.sum * (discountRate / 100));
        this._toastr.success(`Coupon appliqué avec succès. Taux de réduction : ${discountRate}%`);
        this._paymentService.setSum(this.sum);
      } else {
        this._toastr.error('Taux de réduction du coupon invalide.');
      }
    } else {
      this._toastr.error('Coupon non trouvé.');
    }
  }

  applyTotalDiscount() {
    if (this.appliedCoupon) {
      let discountRate = this.appliedCoupon.discountRate;
      this.sum -= (this.sum * (discountRate / 100));
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
      this._router.navigateByUrl("payment");
    }
    else{
      this._router.navigateByUrl("login");
    }
  }

  getCoupon(){
    this._coupon.getAll(res => this.coupons = res);
  }
}
