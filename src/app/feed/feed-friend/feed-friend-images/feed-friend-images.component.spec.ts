import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFriendImagesComponent } from './feed-friend-images.component';

describe('FeedFriendImagesComponent', () => {
  let component: FeedFriendImagesComponent;
  let fixture: ComponentFixture<FeedFriendImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFriendImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFriendImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
