import { Injectable } from '@angular/core';
import { PaymentModel } from '../models/payment.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentSum: number = 0;


  constructor(
    private _http: GenericHttpService,
    private router: Router
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

  control(){
 
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
 
     if (user) {
       return true;
     }
 
     
     this.router.navigateByUrl("/");
     return false;
  }
}
