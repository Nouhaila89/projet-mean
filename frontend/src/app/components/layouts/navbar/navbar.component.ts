import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BasketService } from '../../baskets/service/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(
    public _basket: BasketService,
    private _router: Router
  ){
    this._basket.getCount();
  }
  ngOnInit(): void {
    this.control();
  }

  result: boolean = true;

  control(){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if(user){
      this.result = false;
    }
  }

  exit(){
    localStorage.removeItem("user");
    this.result = true;
    this._router.navigateByUrl("login");
  }
}
