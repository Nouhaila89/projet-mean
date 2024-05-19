import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnavbar',
  standalone: true,
  imports: [],
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.css'
})
export class AdminnavbarComponent {
  constructor(
    private _router: Router
  ){
    
  }
exit(){
  localStorage.removeItem("user");
  this._router.navigateByUrl("login");
}
}
