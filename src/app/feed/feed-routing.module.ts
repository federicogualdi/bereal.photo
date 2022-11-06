import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { FeedFriendListComponent } from './feed-friend-list/feed-friend-list.component';
import { FeedResolverService } from './feed-resolver.service';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      feedFriends: FeedResolverService,
    },
    children: [
      {
        path: "",
        component: FeedFriendListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule { }
