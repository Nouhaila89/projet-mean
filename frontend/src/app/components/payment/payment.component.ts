import { Component, OnInit } from '@angular/core';
import { PaymentModel } from './models/payment.model';
import { PaymentService } from './service/payment.service';
import { SharedModule } from '../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private _paymentService: PaymentService,   private _toastr: ToastrService) {}
  ngOnInit(): void {
    this.paymentModel.price = this._paymentService.getSum(); 
  }

  makePayment() {
    this._paymentService.add(this.paymentModel, res => {
      this._toastr.success(res.message);
    } )
  }
}