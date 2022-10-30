import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedFriendComponent } from './feed-friend/feed-friend.component';
import { FeedFriendListComponent } from './feed-friend-list/feed-friend-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FeedFriendComponent,
    FeedFriendListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedRoutingModule,
  ]
})
export class FeedModule { }
