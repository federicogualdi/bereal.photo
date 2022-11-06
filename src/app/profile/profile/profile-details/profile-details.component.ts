import { Component, Input, OnInit } from '@angular/core';
import { RelationshipFriend } from 'src/app/shared/model/relationship-friends';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  @Input() relationshipFriend!: RelationshipFriend;

  constructor() { }

  ngOnInit(): void { }

}
