import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss']
})
export class SendOtpComponent implements OnInit {

  formGroup = new FormGroup({
    phone: new FormControl<string>("", Validators.required,)
  });

  constructor(
    private router: Router,
    private signInService: SignInService,
  ) { }

  ngOnInit(): void { }

  sendOtp() {
    this.signInService.sendOtp(this.formGroup.value.phone!)
      .pipe(
        tap(() => this.router.navigate(['/sign-in/verify-otp'])),
      ).subscribe();
  }

}
