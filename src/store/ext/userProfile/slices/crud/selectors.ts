import { UserProfileStoreState } from '@/store/ext/userProfile/initialState';

const activeUserProfileId = (s: UserProfileStoreState) => s.activeUserProfileId;

const getUserProfileById = (id: string) => (s: UserProfileStoreState) =>
  s.activeUserProfileItems[id];

const getUserProfileNameById = (id: string) => (s: UserProfileStoreState) =>
  getUserProfileById(id)(s)?.name;

export const UserProfileSelectors = {
  activeUserProfileId,
  getUserProfileNameById,
};
