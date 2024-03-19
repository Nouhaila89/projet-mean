import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../components/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( 
    private _auth: AuthService, 
    private router: Router
    ) {
    }

  canActivate(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){

   const userString = localStorage.getItem("user"); 

   const user = userString ? JSON.parse(userString) : {};

    const isAdmin = user.isAdmin;

    if (localStorage.getItem("token") && isAdmin) {
      return true;
    }

    
    this.router.navigateByUrl("/");
    return false;
  }
}