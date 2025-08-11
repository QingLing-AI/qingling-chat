import { Icon } from '@lobehub/ui';
import { UserPenIcon } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createModal } from '@/components/FunctionModal';
import { useUserProfileStore } from '@/store/ext/userProfile';
import { CreateUserProfileParams, UserProfileItem } from '@/types/ext/userProfile';

import BaseForm from './BaseForm';

interface EditFormProps {
  onClose?: () => void;
  profile: UserProfileItem;
}

export const EditForm = memo<EditFormProps>(({ profile, onClose }) => {
  const { t } = useTranslation('ext.userProfile');
  const [loading, setLoading] = useState(false);
  const [updateUserProfile, refreshUserProfileList] = useUserProfileStore((s) => [
    s.updateUserProfile,
    s.refreshUserProfileList,
  ]);

  const onFinish = async (values: CreateUserProfileParams) => {
    setLoading(true);

    try {
      await updateUserProfile(profile.id, values);
      setLoading(false);
      onClose?.();

      await refreshUserProfileList();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <BaseForm
      initialValues={{
        name: profile.name,
        profile: profile.profile,
      }}
      onCancel={onClose}
      onSubmit={onFinish}
      submitButtonText={t('createNew.save')}
      submitting={loading}
    />
  );
});

const Title = ({ profile }: { profile: UserProfileItem }) => {
  const { t } = useTranslation('ext.userProfile');
  return (
    <Flexbox gap={8} horizontal>
      <Icon icon={UserPenIcon} />
      {t('createNew.editTitle')} - {profile.name}
    </Flexbox>
  );
};

export const useEditModal = createModal<UserProfileItem>((instance, profile) => {
  if (!profile) throw new Error("profile is required");

  return {
    content: (
      <Flexbox paddingInline={16} style={{ paddingBottom: 16 }}>
        <EditForm
          onClose={() => {
            instance.current?.destroy();
          }}
          profile={profile}
        />
      </Flexbox>
    ),
    focusTriggerAfterClose: true,
    footer: false,
    title: <Title profile={profile} />,
  };
});
