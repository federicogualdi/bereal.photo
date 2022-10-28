import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

const routes: Routes = [
  {
    path: "",
    component: SignInComponent,
    children:[
      {
        path: "send-otp",
        component: SendOtpComponent
      },
      {
        path: "verify-otp",
        component: VerifyOtpComponent
      },
      {
        path:"",
        pathMatch: "full",
        redirectTo: "send-otp"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
