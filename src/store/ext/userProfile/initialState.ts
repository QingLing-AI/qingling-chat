import { UserProfileState, initialUserProfileState } from './slices/crud';

export type UserProfileStoreState = UserProfileState;

export const initialState: UserProfileStoreState = {
  ...initialUserProfileState,
};
