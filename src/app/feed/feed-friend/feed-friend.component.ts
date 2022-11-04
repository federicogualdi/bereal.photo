import { Component, Input, OnInit } from '@angular/core';
import { FeedFriend } from 'src/app/shared/model/feed-friend';

@Component({
  selector: 'app-feed-friend',
  templateUrl: './feed-friend.component.html',
  styleUrls: ['./feed-friend.component.scss']
})
export class FeedFriendComponent implements OnInit {

  @Input() feedFriend?: FeedFriend;

  constructor() { }

  ngOnInit(): void { }

}
