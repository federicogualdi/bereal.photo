import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
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

  protected basePath = 'https://7o3ud6unh2.execute-api.eu-south-1.amazonaws.com';

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

  private updateToken(): Observable<string> {
    let isLoggedIn = false;

    try {
      isLoggedIn = this.isLoggedIn();
    }
    catch (e) {
      return throwError(() => e)
    }

    if (isLoggedIn) {
      return of(this.beRealPhotoToken?.idToken!);
    }

    return this.refreshToken(this.getRefreshToken()!).pipe(
      map(res => res.id_token)
    );
  }

  private refreshToken(refreshToken: string) {
    return this.httpClient.post<RefreshToken>(
      this.basePath + this.REFRESH_TOKEN_URL,
      {
        refresh_token: refreshToken,
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

  private getRefreshToken() {
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
