import { Component, OnInit } from '@angular/core';
import { PaymentModel } from './models/payment.model';
import { PaymentService } from './service/payment.service';
import { SharedModule } from '../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders/services/order.service';
import { BasketService } from '../baskets/service/basket.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  paymentModel: PaymentModel = new PaymentModel();
  paymentMessage: string = '';

  constructor(private _paymentService: PaymentService,   private _toastr: ToastrService, private _order: OrderService, private _basket: BasketService) {}
  ngOnInit(): void {
    this.paymentModel.price = this._paymentService.getSum(); 
  }

  makePayment() {
    this._paymentService.add(this.paymentModel, (res) => {
      if (res.message = "Ödeme başarılı") {
        this._toastr.success(res.message);
        this.createOrder();
      } else {
        this._toastr.error(res.message);
      }
    });
  }

  createOrder(){
      this._order.create(res=> {
        this._toastr.success(res.message);
      });
  }
}