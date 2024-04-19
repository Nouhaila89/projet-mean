import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../orders/models/order.model';
import { OrderService } from '../orders/services/order.service';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  orders: OrderModel[] = []
  constructor(
    private _order: OrderService
  ) {}
  ngOnInit(): void {
    this._order.getAllOrders(res => this.orders = res);
  }
}
