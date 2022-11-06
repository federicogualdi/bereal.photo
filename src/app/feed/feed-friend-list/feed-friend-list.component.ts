import { Component, OnInit } from '@angular/core';
import { FeedFriend } from 'src/app/shared/model/feed-friend';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed-friend-list',
  templateUrl: './feed-friend-list.component.html',
  styleUrls: ['./feed-friend-list.component.scss']
})
export class FeedFriendListComponent implements OnInit {

  constructor(
    public feedService: FeedService,
  ) { }

  ngOnInit(): void {
  }

  trackByIdentity = (index: number, item: FeedFriend) => item.id;

}
