import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { FeedFriend } from '../shared/model/feed-friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  protected basePath = 'https://7o3ud6unh2.execute-api.eu-south-1.amazonaws.com';

  private readonly FEEDS_FRIEND_URL = "/api/feeds/friends";

  feedFriends$ = new BehaviorSubject<FeedFriend[]>([]);

  constructor(
    protected httpClient: HttpClient,
  ) { }

  getFeedFriends() {
    return this.httpClient.get<FeedFriend[]>(this.basePath + this.FEEDS_FRIEND_URL).pipe(tap((res) => this.feedFriends$.next(res)));
  }
}
