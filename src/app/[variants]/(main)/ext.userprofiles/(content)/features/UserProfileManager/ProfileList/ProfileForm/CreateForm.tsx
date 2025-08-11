import { Icon } from '@lobehub/ui';
import { UserPlus2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { createModal } from '@/components/FunctionModal';
import { useUserProfileStore } from '@/store/ext/userProfile';
import { CreateUserProfileParams } from '@/types/ext/userProfile';

import BaseForm from './BaseForm';


interface CreateFormProps {
  onClose?: () => void;
}

export const CreateForm = memo<CreateFormProps>(({ onClose }) => {
  const { t } = useTranslation('ext.userProfile');
  const [loading, setLoading] = useState(false);
  const [createNewUserProfile, refreshUserProfileList] = useUserProfileStore((s) => [
    s.createNewUserProfile,
    s.refreshUserProfileList,
  ]);

  const onFinish = async (values: CreateUserProfileParams) => {
    setLoading(true);

    try {
      await createNewUserProfile(values);
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
      onCancel={onClose}
      onSubmit={onFinish}
      submitButtonText={t('createNew.confirm')}
      submitting={loading}
    />
  );
});

const Title = () => {
  const { t } = useTranslation('ext.userProfile');
  return (
    <Flexbox gap={8} horizontal>
      <Icon icon={UserPlus2} />
      {t('createNew.title')}
    </Flexbox>
  );
};

export const useCreateNewModal = createModal((instance) => {
  return {
    content: (
      <Flexbox paddingInline={16} style={{ paddingBottom: 16 }}>
        <CreateForm
          onClose={() => {
            instance.current?.destroy();
          }}
        />
      </Flexbox>
    ),
    focusTriggerAfterClose: true,
    footer: false,
    title: <Title />,
  };
});
