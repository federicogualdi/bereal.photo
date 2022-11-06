import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { FeedFriend } from '../shared/model/feed-friend';
import { FeedService } from './feed.service';

@Injectable({
  providedIn: 'root'
})
export class FeedResolverService implements Resolve<FeedFriend[]> {
  constructor(
    private feedService: FeedService
  ) { }

  resolve(): Observable<FeedFriend[]> {

    if (this.feedService.feedFriends$.value?.length !== 0) {
      return this.feedService.feedFriends$.pipe(
        tap(() => this.feedService.getFeedFriends().subscribe()),
      );
    }

    return this.feedService.getFeedFriends().pipe(
      take(1),
      catchError(() => {
        return EMPTY;
      })
    );

  }
}
