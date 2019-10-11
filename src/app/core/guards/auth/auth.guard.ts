import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const authState = await this.authService.authState;

    if (state.url === '/login' && authState) {
      await this.router.navigate([ '/app' ]);
      return false;
    }

    if (state.url.includes('/app') && !authState) {
      await this.router.navigate([ '/login' ]);
      return false;
    }
    return true;
  }

}
