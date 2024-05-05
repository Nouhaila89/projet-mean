import { Injectable } from '@angular/core';
import { BasketModel } from '../models/basket.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  count: number = 0;

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(callBack: (res: BasketModel[]) => void) {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = { userId: user ? user._id : null }; // Eğer user null ise userId null olacak
    this._http.post<BasketModel[]>("baskets", model, res => callBack(res));
  }

  getCount() {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let userId = user ? user._id : null; // Eğer user null ise userId null olacak
      let model = { userId: userId };
      this._http.post<any>("baskets/getCount", model, res => {
        if (res && res.count) {
          this.count = res.count;
        } else {
          // this.count = 0;
        }
      });
  }

  add(model: BasketModel, callBack: (res: MessageResponseModel) => void) {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    model.userId = user ? user._id : null;
    this._http.post<MessageResponseModel>("baskets/add", model, res => {
      this.getCount();
      callBack(res);
    });
  }

  updateQuantity(_id: string, newQuantity: number, callBack: (res: MessageResponseModel) => void) {
    const model = { _id: _id, quantity: newQuantity };
    this._http.post<MessageResponseModel>("baskets/updateQuantity", model, res => {
      this.getCount();
      callBack(res);
    });
  }

  removeById(model: any, callBack: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>("baskets/removeById", model, res => {
      this.getCount();
      callBack(res);
    });
  }
}