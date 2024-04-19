import { Injectable } from '@angular/core';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { OrderModel } from '../models/order.model';
import { BasketService } from '../../baskets/service/basket.service';
import { GenericHttpService } from '../../../common/services/generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http: GenericHttpService,
    private _basket: BasketService
  ) { }

  create(callBack: (res: MessageResponseModel)=> void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = {userId: user._id};
    this._http.post<MessageResponseModel>("orders/create",model,res=> {
      this._basket.getCount();
      callBack(res);
    });
  }

  getAll(callBack: (res: OrderModel[])=> void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = {userId: user._id};
    this._http.post<OrderModel[]>("orders",model,res=> {      
      callBack(res);
    });
  }

  getAllOrders(callBack: (res: OrderModel[])=> void){
    this._http.get<OrderModel[]>("orders/all",res=>  
      callBack(res)
    );
  }
}
