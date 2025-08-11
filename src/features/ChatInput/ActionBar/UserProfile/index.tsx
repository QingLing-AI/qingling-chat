import { UserPen } from 'lucide-react';
import { Suspense, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'antd-style';


import { useAgentStore } from '@/store/agent';
import { extUserProfileSelectors } from '@/store/agent/selectors';
import { useUserProfileStore } from '@/store/ext/userProfile/store';

import Action from '../components/Action';
import Controls from './Controls';

const UserProfile = memo(() => {
  const { t } = useTranslation('chat');
  const theme = useTheme();

  // const [modalOpen, setModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const currentAgentExtUserProfile = useAgentStore((s) =>
    extUserProfileSelectors.currentAgentExtUserProfile(s),
  );
  const isAgentEnableUserProfile = !!currentAgentExtUserProfile;

  const useFetchUserProfileList = useUserProfileStore((s)=>s.useFetchUserProfileList);
  const { isLoading, error, data } = useFetchUserProfileList();

  const actionUpdating = isLoading || updating

  const content = (
    <Action
      color={isAgentEnableUserProfile ? theme.colorInfo: undefined}
      disabled={!!error}
      icon={UserPen}
      loading={actionUpdating}
      popover={{
        content: <Controls options={data || []} setUpdating={setUpdating} />,
        maxWidth: 320,
        minWidth: 320,
        placement: 'topLeft',
        styles: {
          body: {
            padding: 4,
          },
        },
      }}
      showTooltip={false}
      title={t('userProfile.title')}
    />
  );

  return (
    <Suspense fallback={<Action disabled icon={UserPen} title={t('userProfile.title')} />}>
      {content}
      {/* <AssignUserProfile open={modalOpen} setOpen={setModalOpen} /> */}
    </Suspense>
  );

});

export default UserProfile;
