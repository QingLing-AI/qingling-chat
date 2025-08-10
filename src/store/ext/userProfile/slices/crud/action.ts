import { SWRResponse, mutate } from 'swr';
import { StateCreator } from 'zustand/vanilla';

import { useClientDataSWR } from '@/libs/swr';
import { userProfileService } from '@/services/ext/userProfile';
import { UserProfileStore } from '@/store/ext/userProfile/store';
import { CreateUserProfileParams, UserProfileItem } from '@/types/ext/userProfile';

const FETCH_USERP_ROFILE_LIST_KEY = 'FETCH_EXT_USERP_ROFILE';
const FETCH_USERP_ROFILE_ITEM_KEY = 'FETCH_EXT_USERP_ROFILE_ITEM';

export interface UserProfileCrudAction {
  createNewUserProfile: (params: CreateUserProfileParams) => Promise<string>;
  internal_toggleUserProfileLoading: (id: string, loading: boolean) => void;
  refreshUserProfileList: () => Promise<void>;

  removeManyUserProfiles: (ids: string[]) => Promise<void>;
  removeUserProfile: (id: string) => Promise<void>;
  updateUserProfile: (id: string, value: CreateUserProfileParams) => Promise<void>;

  useFetchUserProfileItem: (id: string) => SWRResponse<UserProfileItem | undefined>;
  useFetchUserProfileList: (params?: { suspense?: boolean }) => SWRResponse<UserProfileItem[]>;
}

export const createCrudSlice: StateCreator<
  UserProfileStore,
  [['zustand/devtools', never]],
  [],
  UserProfileCrudAction
> = (set, get) => ({
  createNewUserProfile: async (params) => {
    const id = await userProfileService.createUserProfile(params);

    await get().refreshUserProfileList();

    return id;
  },

  internal_toggleUserProfileLoading: (id, loading) => {
    set(
      (state) => {
        if (loading) return { userProfileLoadingIds: [...state.userProfileLoadingIds, id] };

        return { userProfileLoadingIds: state.userProfileLoadingIds.filter((i) => i !== id) };
      },
      false,
      'toggleUserProfileLoading',
    );
  },

  refreshUserProfileList: async () => {
    await mutate(FETCH_USERP_ROFILE_LIST_KEY);
  },

  removeManyUserProfiles: async (ids) => {
    await userProfileService.deleteManyUserProfiles(ids);
    await get().refreshUserProfileList();
  },

  removeUserProfile: async (id) => {
    await userProfileService.deleteUserProfile(id);
    await get().refreshUserProfileList();
  },

  updateUserProfile: async (id, value) => {
    get().internal_toggleUserProfileLoading(id, true);
    await userProfileService.updateUserProfile(id, value);
    await get().refreshUserProfileList();

    get().internal_toggleUserProfileLoading(id, false);
  },

  useFetchUserProfileItem: (id) =>
    useClientDataSWR<UserProfileItem | undefined>(
      [FETCH_USERP_ROFILE_ITEM_KEY, id],
      () => userProfileService.getUserProfileById(id),
      {
        onSuccess: (item) => {
          if (!item) return;

          set({
            activeUserProfileId: id,
            activeUserProfileItems: {
              ...get().activeUserProfileItems,
              [id]: item,
            },
          });
        },
      },
    ),

  useFetchUserProfileList: (params = {}) =>
    useClientDataSWR<UserProfileItem[]>(
      FETCH_USERP_ROFILE_LIST_KEY,
      () => userProfileService.getUserProfileList(),
      {
        fallbackData: [],
        onSuccess: () => {
          if (!get().initUserProfileList)
            set({ initUserProfileList: true }, false, 'useFetchUserProfileList/init');
        },
        suspense: params.suspense,
      },
    ),
});
