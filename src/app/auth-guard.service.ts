import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { ApiserviceService } from './services/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: ApiserviceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.role;
    const currentRole = this.auth.getUserRole();

    if (this.auth.isAuthenticated() && currentRole === expectedRole) {
      return true;
    }

    // If the user is not authenticated or does not have the expected role
    this.router.navigate(['/login']);
    return false;
  }
}
