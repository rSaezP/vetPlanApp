import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: any): Promise<boolean> {
    const expectedRole = route.data.expectedRole;
    const userRole = await this.authService.getCurrentUserRole(); // Implementa este método en `AuthService`

    if (userRole !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
