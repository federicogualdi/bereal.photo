import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OtpVerified } from '../sign-in/sign-in.service';

type RefreshToken = {
  refresh_token: string;
  id_token: string;
  expires_in: string;
}

type BeRealPhotoToken = {
  idToken: string;
  refreshToken: string;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly REFRESH_TOKEN_URL = "/refreshToken";

  private readonly REFRESH_STORAGE_KEY = "bereal-refresh-token";
  public readonly GOOGLE_KEY = "AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA";

  beRealPhotoToken: BeRealPhotoToken | undefined;

  constructor(
    protected httpClient: HttpClient,
  ) { }

  isLoggedIn(): boolean {
    this.beRealPhotoToken = this.getRefreshToken();

    if (!this.beRealPhotoToken) {
      throw new Error('Cannot update token without logged in user');
    }

    const isTokenExpired =
      Date.now() >= this.beRealPhotoToken?.expiresAt!;

    return !isTokenExpired;
  }

  otpVerified({ idToken, refreshToken, expiresIn }: OtpVerified) {
    this.saveRefreshedTokenData(idToken, refreshToken, expiresIn);
  }

  getToken(): Observable<string> {
    return this.updateToken();
  }

  private saveRefreshedTokenData(idToken: string, refreshToken: string, expiresIn: string) {
    this.beRealPhotoToken = {
      idToken: idToken,
      refreshToken: refreshToken,
      expiresAt: Date.now() + ((+expiresIn) * 1000)
    }
    this.saveToken()

  }

  updateToken(): Observable<string> {
    try {
      const isLoggedIn = this.isLoggedIn();


      if (isLoggedIn) {
        return of(this.beRealPhotoToken?.idToken!);
      }

      return this.refreshToken().pipe(
        map(res => res.id_token)
      );
    }
    catch (e) {
      return throwError(() => e)
    }
  }

  refreshToken() {
    return this.httpClient.post<RefreshToken>(
      environment.basePath + this.REFRESH_TOKEN_URL,
      {
        refresh_token: this.getRefreshToken()?.refreshToken,
        grant_type: "refresh_token"
      },
      {
        params: {
          key: this.GOOGLE_KEY
        }
      }
    ).pipe(
      tap(res => this.saveRefreshedTokenData(res.id_token, res.refresh_token, res.expires_in)),
    );
  }

  private getRefreshToken(): BeRealPhotoToken | undefined {
    const obj = localStorage.getItem(this.REFRESH_STORAGE_KEY);
    if (!obj) return undefined;
    return JSON.parse(obj);
  }

  private saveToken() {
    localStorage.setItem(this.REFRESH_STORAGE_KEY, JSON.stringify(this.beRealPhotoToken));
  }
  private logout() {
    localStorage.removeItem(this.REFRESH_STORAGE_KEY);
  }
}
