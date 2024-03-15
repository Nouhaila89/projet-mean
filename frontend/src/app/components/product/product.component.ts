import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
