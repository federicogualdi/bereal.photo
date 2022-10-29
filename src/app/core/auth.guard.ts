import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.handleAuthentication();
  }

  canActivateChild(): Observable<boolean> {
    return this.handleAuthentication();
  }

  canLoad(): Observable<boolean> {
    return this.handleAuthentication();
  }

  private handleAuthentication(): Observable<boolean> {
    return new Observable().pipe(
      startWith(""),
      switchMap(() =>
        iif(() =>
          this.authService.isLoggedIn(),
          of(true),
          this.authService.refreshToken().pipe(map(() => (true)))
        )
      ),
      catchError((err) => {
        this.router.navigate(['/sign-in']);
        return of(false);
      })
    );
  }
}
