import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFriendListComponent } from './feed-friend-list.component';

describe('FeedFriendListComponent', () => {
  let component: FeedFriendListComponent;
  let fixture: ComponentFixture<FeedFriendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFriendListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
