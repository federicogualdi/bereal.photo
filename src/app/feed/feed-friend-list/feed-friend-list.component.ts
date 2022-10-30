import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-feed-friend-list',
  templateUrl: './feed-friend-list.component.html',
  styleUrls: ['./feed-friend-list.component.scss']
})
export class FeedFriendListComponent implements OnInit {

  constructor(
    public friendsService: FriendsService,
  ) {
    if (friendsService.feedFriends$.value.length === 0) {
      friendsService.getFeedFriends().subscribe();
    }
  }

  ngOnInit(): void {
  }

}
