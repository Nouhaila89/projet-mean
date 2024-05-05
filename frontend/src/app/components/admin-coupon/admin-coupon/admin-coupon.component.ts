import { Component } from '@angular/core';
import { CouponModel } from '../models/coupon.model';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../common/services/swal.service';
import { CouponService } from '../services/coupon.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
  selector: 'app-admin-coupon',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-coupon.component.html',
  styleUrl: './admin-coupon.component.css'
})
export class AdminCouponComponent {
  coupons: CouponModel[] = [];
  updateCoupon: CouponModel = new CouponModel();
  search: string = "";

  constructor(
    private _toastr: ToastrService,
    private _coupon: CouponService,
    private _swal: SwalService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._coupon.getAll(res=> this.coupons = res);
  }

  add(form:NgForm){
    if (form.valid) {
      let coupon = new CouponModel(); 
      coupon.name = form.value["name"]; 
      coupon.discountRate = form.value["discountRate"]; 
 
      this._coupon.add(coupon,res=>{
        this._toastr.success(res.message); 
        let element = document.getElementById("addModelCloseBtn");
        element?.click();
        form.reset();
        this.getAll(); 
      }); 
    }
  }

  get(model: CouponModel){
    this.updateCoupon = {...model};
  }
  
  update(form:NgForm){
    if (form.valid) {
      this._coupon.update(this.updateCoupon, res=>{
        this._toastr.warning(res.message);
        this.getAll();
        let element = document.getElementById("updateModalCloseBtn");
        element?.click();
      })
    }
  }

  removeById(model: CouponModel){
    this._swal.callSwal(`${model.name} kategorisini silmek istiyormusunuz`, "" ,"Sil",()=>{
      this._coupon.removeById(model._id,res=>{
        this._toastr.info(res.message);
        this.getAll();
      })
    });
  }
}
