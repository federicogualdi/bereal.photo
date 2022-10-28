import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.shouldAddToken(request)) {
      return next.handle(request);
    }

    return this.addTokenToHeader(request.headers).pipe(
      mergeMap((headersWithBearer) => {
        const kcReq = request.clone({ headers: headersWithBearer });
        return next.handle(kcReq);
      })
    );
  }

  public addTokenToHeader(headers: HttpHeaders = new HttpHeaders()) {
    return this.authService
      .getToken()
      .pipe(map((token) => headers.set('Authorization', `Bearer ${token}`)));
  }

  private shouldAddToken(request: HttpRequest<unknown>): boolean {
    if (request.headers.has('Authorization')) {
      return false;
    }

    if (request.url.indexOf('/sendVerificationCode') !== -1) {
      return false;
    }

    if (request.url.indexOf('/verifyPhoneNumber') !== -1) {
      return false;
    }

    return true;
  }
}
