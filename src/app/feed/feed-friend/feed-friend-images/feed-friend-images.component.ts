import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, merge, MonoTypeOperatorFunction, Observable, switchMap, takeUntil, tap, timer } from 'rxjs';
import { FeedFriend } from 'src/app/shared/model/feed-friend';

function preventDefault<T extends Event>(): MonoTypeOperatorFunction<T> {
  return tap(e => {
    if (e.type === "touchend" && e.cancelable)
      e.preventDefault();
  });
}

@Component({
  selector: 'app-feed-friend-images',
  templateUrl: './feed-friend-images.component.html',
  styleUrls: ['./feed-friend-images.component.scss']
})
export class FeedFriendImagesComponent implements OnInit {

  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  @Input() feedFriend?: FeedFriend;

  images: string[] = [];


  mouseDown$: Observable<any> = new Observable();
  mouseUp$: Observable<any> = new Observable();
  stream$: Observable<any> = new Observable();
  Date: any = Date;

  constructor() { }

  ngOnInit(): void {
    this.addDiffImages();

    this.mouseUp$ = merge(
      fromEvent(this.carousel.nativeElement, "touchend"),
      fromEvent(this.carousel.nativeElement, "mouseup")
    ).pipe(preventDefault());

    this.mouseDown$ = merge(
      fromEvent(this.carousel.nativeElement, "touchstart"),
      fromEvent(this.carousel.nativeElement, "mousedown")
    ).pipe(preventDefault());

    this.stream$ = this.mouseDown$.pipe(
      switchMap(() => timer(350).pipe(takeUntil(this.mouseUp$))),
    );

    this.stream$
      .pipe(
        tap(() => this.images.splice(1, 1)),
      )
      .subscribe()

    this.mouseUp$
      .pipe(
        switchMap(() => timer(50)),
        tap(() => this.images.length === 2 ? this.swapImage() : this.addDiffImages()),
      ).subscribe()
  }

  addDiffImages() {
    if (this.images.length < 2) {
      [this.feedFriend?.photoURL!, this.feedFriend?.secondaryPhotoURL!].forEach(img => this.images.indexOf(img) === -1 ? this.images.push(img) : null)
    }
  }

  swapImage() {
    this.images = this.images.reverse();
  }

}
