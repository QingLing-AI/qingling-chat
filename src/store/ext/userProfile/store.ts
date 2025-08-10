import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { createDevtools } from '../../middleware/createDevtools';
import { UserProfileStoreState, initialState } from './initialState';
import { UserProfileCrudAction, createCrudSlice } from './slices/crud';

//  ===============  聚合 createStoreFn ============ //

export interface UserProfileStore
  extends UserProfileStoreState,
    UserProfileCrudAction
    {
  // empty
}

const createStore: StateCreator<UserProfileStore, [['zustand/devtools', never]]> = (
  ...parameters
) => ({
  ...initialState,
  ...createCrudSlice(...parameters),
});

//  ===============  实装 useStore ============ //
const devtools = createDevtools('ext.userProfiles');

export const useUserProfileStore = createWithEqualityFn<UserProfileStore>()(
  devtools(createStore),
  shallow,
);
