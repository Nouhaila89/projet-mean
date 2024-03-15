import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { AdminnavbarComponent } from './adminnavbar/adminnavbar.component';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';

@Component({
  selector: 'app-adminlayouts',
  standalone: true,
  imports: [SharedModule,AdminnavbarComponent,AdminAsideComponent,AdminFooterComponent],
  templateUrl: './adminlayouts.component.html',
  styleUrl: './adminlayouts.component.css'
})
export class AdminlayoutsComponent {

}
