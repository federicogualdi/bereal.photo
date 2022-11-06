import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { RelationshipFriend } from '../shared/model/relationship-friends';
import { FriendsService } from './friends.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsResolverService implements Resolve<RelationshipFriend[]> {
  constructor(
    private friendsService: FriendsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<RelationshipFriend[]> {

    const username = route.params['username'];

    if (this.friendsService.getByUsername(username)) {
      return this.friendsService.friendProfiles$;
    }

    return this.friendsService.getFriendProfiles().pipe(
      take(1),
      catchError(() => {
        return EMPTY;
      })
    );

  }
}
