export interface ProfilePicture {
  url: string;
  height: number;
  width: number;
}

export interface RelationshipFriend {
  id: string;
  username?: string;
  fullname: string;
  status: string;
  profilePicture: ProfilePicture;
}

export interface ResultRelationshipFriend {
  next?: any;
  total: number;
  data: RelationshipFriend[];
}
