export interface UserProfileItem {
  avatar: string | null;
  createdAt: Date;
  enabled?: boolean;
  id: string;
  name: string;
  profile: string;
  updatedAt: Date;
}


export interface CreateUserProfileParams {
  avatar?: string;
  name: string;
  profile: string;
}

export interface UserProfileListItem {
  createdAt: Date;
  id: string;
  name: string;
  profile: string;
  updatedAt: Date;
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}
