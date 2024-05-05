import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CouponModel } from '../models/coupon.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(callBack: (res: CouponModel[])=> void){
    this._http.get<CouponModel[]>("coupon", res=> callBack(res));    
  }

  add(model:CouponModel, callBack: (res:MessageResponseModel)=> void){
    this._http.post<MessageResponseModel>("coupon/add", model, res=> callBack(res));
  }

  update(model:CouponModel, callBack: (res:MessageResponseModel)=> void){
    this._http.post<MessageResponseModel>("coupon/update", model, res=> callBack(res));
  }

  removeById(_id: string, callBack: (res:MessageResponseModel)=> void){
    let model = {_id:_id};
    this._http.post<MessageResponseModel>("coupon/removeById", model, res=> callBack(res));
  }
}
