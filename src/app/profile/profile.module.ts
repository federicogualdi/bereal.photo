import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileNavbarComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
