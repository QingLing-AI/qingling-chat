import { AgentStoreState } from '@/store/agent/initialState';
import { UserProfileItem } from '@/types/ext/userProfile';


// ==========   Config   ============== //
import { currentAgentConfig } from './agent';

const currentAgentExtUserProfile = (s: AgentStoreState): UserProfileItem | undefined => {
  const config = currentAgentConfig(s);

  return config?.extUserProfile;
  };

export const extUserProfileSelectors = {
  currentAgentExtUserProfile,
};
