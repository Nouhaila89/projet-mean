import { Injectable } from '@angular/core';
import { PaymentModel } from '../models/payment.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentSum: number = 0;


  constructor(
    private _http: GenericHttpService 
  ) { }

  add(model: PaymentModel, callBack: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>("payme/payment", model, res => {
      callBack(res);
    });
  }

  setSum(sum: number) {
    this.paymentSum = sum;
  }

  getSum(): number {
    return this.paymentSum;
  }
}
