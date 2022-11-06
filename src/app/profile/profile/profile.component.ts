import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelationshipFriend } from 'src/app/shared/model/relationship-friends';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profiles: RelationshipFriend[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private friend: FriendsService,
  ) { }

  ngOnInit(): void { }

  getByUsername() {
    const username = this.route.snapshot.params['username'];
    return this.friend.getByUsername(username);
  }
}
