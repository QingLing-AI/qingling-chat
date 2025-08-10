import { UserProfileItem } from '@/types/ext/userProfile';

export interface UserProfileState {
  activeUserProfileId: string | null;
  activeUserProfileItems: Record<string, UserProfileItem>;
  initUserProfileList: boolean;
  userProfileLoadingIds: string[];
  // userProfileRenamingId?: string | null;
}

export const initialUserProfileState: UserProfileState = {
  activeUserProfileId: null,
  activeUserProfileItems: {},
  initUserProfileList: false,
  userProfileLoadingIds: [],
};
