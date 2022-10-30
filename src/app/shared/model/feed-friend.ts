export interface ProfilePicture {
  height: number;
  width: number;
  url: string;
}

export interface User {
  id: string;
  username: string;
  profilePicture: ProfilePicture;
}

export interface Location {
  _latitude: number;
  _longitude: number;
}

export interface CreationDate {
  _seconds: number;
  _nanoseconds: number;
}

export interface TakenAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface ProfilePicture2 {
  height: number;
  width: number;
  url: string;
}

export interface User2 {
  id: string;
  username: string;
  profilePicture: ProfilePicture2;
}

export interface CreationDate2 {
  _seconds: number;
  _nanoseconds: number;
}

export interface Comment {
  id: string;
  uid: string;
  userName: string;
  user: User2;
  text: string;
  creationDate: CreationDate2;
}

export interface ProfilePicture3 {
  height: number;
  width: number;
  url: string;
}

export interface User3 {
  id: string;
  username: string;
  profilePicture: ProfilePicture3;
}

export interface Date {
  _seconds: number;
  _nanoseconds: number;
}

export interface RealMoji {
  id: string;
  uid: string;
  userName: string;
  user: User3;
  emoji: string;
  type: string;
  uri: string;
  date: Date;
}

export interface FeedFriend {
  id: string;
  notificationID: string;
  ownerID: string;
  userName: string;
  user: User;
  mediaType: string;
  region: string;
  bucket: string;
  photoURL: string;
  imageWidth: number;
  imageHeight: number;
  secondaryPhotoURL: string;
  secondaryImageHeight: number;
  secondaryImageWidth: number;
  members: string[];
  lateInSeconds: number;
  isPublic: boolean;
  location: Location;
  caption: string;
  retakeCounter: number;
  visibility: string[];
  creationDate: CreationDate;
  updatedAt: any;
  takenAt: TakenAt;
  comment: Comment[];
  realMojis: RealMoji[];
  screenshots: any[];
  screenshotsV2: any[];
}
