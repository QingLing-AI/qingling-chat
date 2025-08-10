import { lambdaClient } from '@/libs/trpc/client';
import { CreateUserProfileParams } from '@/types/ext/userProfile';

class UserProfileService {
  createUserProfile = async (params: CreateUserProfileParams) => {
    return lambdaClient.ext.userProfile.create.mutate(params);
  };

  getUserProfileList = async () => {
    return lambdaClient.ext.userProfile.list.query();
  };

  getUserProfileById = async (id: string) => {
    return lambdaClient.ext.userProfile.get.query({ id });
  };

  updateUserProfile = async (id: string, value: any) => {
    return lambdaClient.ext.userProfile.update.mutate({ id, value });
  };

  deleteUserProfile = async (id: string) => {
    return lambdaClient.ext.userProfile.remove.mutate({ id });
  };

  deleteManyUserProfiles = async (ids: string[]) => {
    return lambdaClient.ext.userProfile.removeMany.mutate({ ids });
  };
}

export const userProfileService = new UserProfileService();
