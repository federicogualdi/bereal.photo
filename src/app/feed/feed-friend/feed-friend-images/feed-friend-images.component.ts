import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, MonoTypeOperatorFunction, Observable, switchMap, takeUntil, tap, timer } from 'rxjs';
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
  @ViewChild('download', { static: true }) download!: ElementRef;

  @Input() feedFriend?: FeedFriend;

  images: string[] = [];


  mouseDown$: Observable<any> = new Observable();
  mouseUp$: Observable<any> = new Observable();
  hideSecondImage$: Observable<any> = new Observable();
  downloadImage$: Observable<any> = new Observable();
  Date: any = Date;

  constructor(
    private toastrService: ToastrService,
  ) { }

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

    this.hideSecondImage$ = this.mouseDown$.pipe(
      switchMap(() => timer(350).pipe(
        takeUntil(
          this.mouseUp$
        ))),
    );

    this.downloadImage$ = merge(
      fromEvent(this.download.nativeElement, "touchstart"),
      fromEvent(this.download.nativeElement, "mousedown"),
    );

    this.mouseUp$
      .pipe(
        tap(() => this.images.length === 2 ? this.swapImage() : this.addDiffImages()),
      ).subscribe();

    this.hideSecondImage$
      .pipe(
        tap(() => this.images.splice(1, 1)),
      ).subscribe();

    this.downloadImage$.pipe(
      tap((res) => this.downloadBeReal(res)),
    ).subscribe();
  }

  addDiffImages() {
    if (this.images.length < 2) {
      [this.feedFriend?.photoURL!, this.feedFriend?.secondaryPhotoURL!].forEach(img => this.images.indexOf(img) === -1 ? this.images.push(img) : null)
    }
  }

  swapImage() {
    this.images = this.images.reverse();
  }

  downloadBeReal(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const image = this.images[0];
    if (!image) {
      this.toastrService.error(undefined, "Cannot download BeReal");
      return;
    }

    var link = document.createElement('a');
    link.href = image;
    link.download = `${this.feedFriend?.userName}-${Date.now()}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
