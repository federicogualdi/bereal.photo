import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedFriend } from '../shared/model/feed-friend';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private readonly FEEDS_FRIEND_URL = "/api/feeds/friends";

  feedFriends$ = new BehaviorSubject<FeedFriend[]>([]);

  constructor(
    protected httpClient: HttpClient,
  ) { }

  getFeedFriends() {
    return this.httpClient.get<FeedFriend[]>(environment.basePath + this.FEEDS_FRIEND_URL)
      .pipe(
        tap((res) => this.feedFriends$.next(res)),
      );
  }
}
