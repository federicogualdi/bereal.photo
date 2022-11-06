import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsResolverService } from './friends-resolver.service';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: ":username",
    component: ProfileNavbarComponent,
    children: [
      {
        path: "",
        resolve: {
          friendProfiles: FriendsResolverService
        },
        component: ProfileComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/"
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
