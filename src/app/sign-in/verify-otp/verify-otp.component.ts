import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  formGroup = new FormGroup({
    code: new FormControl<string>("", Validators.required,)
  });

  constructor(
    private router: Router,
    private signInService: SignInService,
  ) { }

  ngOnInit(): void {
  }

  verifyOtp() {
    console.log(this.formGroup.value.code)
    this.signInService.verifyOtp(this.formGroup.value.code!)
      .pipe(
        tap(() => this.router.navigate([''])),
      ).subscribe();
  }

}
