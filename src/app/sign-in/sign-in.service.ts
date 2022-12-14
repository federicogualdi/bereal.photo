import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';

export type OtpVerified = {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private readonly SEND_OTP = "/sendVerificationCode";
  private readonly VERIFY_OTP = "/verifyPhoneNumber";

  private sessionInfo: string = "";

  constructor(
    protected httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  sendOtp(phoneNumber: string) {
    return this.httpClient.post<any>(
      environment.basePath + this.SEND_OTP,
      {
        phoneNumber: phoneNumber,
        iosReceipt: "AEFDNu9QZBdycrEZ8bM_2-Ei5kn6XNrxHplCLx2HYOoJAWx-uSYzMldf66-gI1vOzqxfuT4uJeMXdreGJP5V1pNen_IKJVED3EdKl0ldUyYJflW5rDVjaQiXpN0Zu2BNc1c"
      },
      {
        headers: {
          "Cache-Control": "no-cache",
          "x-ios-bundle-identifier": "AlexisBarreyat.BeReal"
        },
        params: {
          key: this.authService.GOOGLE_KEY
        }
      }
    ).pipe(
      tap(res => this.sessionInfo = res?.sessionInfo),
    )
  }

  verifyOtp(code: string) {
    return this.httpClient.post<OtpVerified>(
      environment.basePath + this.VERIFY_OTP,
      {
        sessionInfo: this.sessionInfo,
        code: code,
        operation: "SIGN_UP_OR_IN"
      },
      {
        headers: {
          "Cache-Control": "no-cache",
        },
        params: {
          key: this.authService.GOOGLE_KEY
        }
      }
    ).pipe(
      tap(res => this.authService.otpVerified(res)),
    )
  }
}
