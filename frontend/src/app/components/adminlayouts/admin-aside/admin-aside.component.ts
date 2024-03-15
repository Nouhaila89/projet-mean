import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
  selector: 'app-admin-aside',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-aside.component.html',
  styleUrl: './admin-aside.component.css'
})
export class AdminAsideComponent {

}
