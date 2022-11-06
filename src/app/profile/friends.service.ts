import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RelationshipFriend, ResultRelationshipFriend } from '../shared/model/relationship-friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private readonly RELATIONSHIP_FRIEND_URL = "/api/relationships/friends";

  friendProfiles$ = new BehaviorSubject<RelationshipFriend[]>([]);

  constructor(
    protected httpClient: HttpClient,
  ) { }

  getFriendProfiles() {
    return this.httpClient.get<ResultRelationshipFriend>(environment.basePath + this.RELATIONSHIP_FRIEND_URL)
      .pipe(
        map(result => result.data),
        tap((res) => this.friendProfiles$.next(res))
      );
  }

  getByUsername(username: string): RelationshipFriend | undefined {
    return this.friendProfiles$.value?.find(p => p.username === username);
  }
}
