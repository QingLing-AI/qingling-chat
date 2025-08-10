import { Button, Form, Input, TextArea } from '@lobehub/ui';
// import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserProfileStore } from '@/store/ext/userProfile';
import { CreateUserProfileParams } from '@/types/ext/userProfile';

interface CreateFormProps {
  onClose?: () => void;
}

const CreateForm = memo<CreateFormProps>(({ onClose }) => {
  const { t } = useTranslation('ext.userProfile');
  const [loading, setLoading] = useState(false);
  const [createNewUserProfile, refreshUserProfileList] = useUserProfileStore((s) => [
    s.createNewUserProfile,
    s.refreshUserProfileList,
  ]);
  // const router = useRouter();

  const onFinish = async (values: CreateUserProfileParams) => {
    setLoading(true);

    try {
      /* const id =  */await createNewUserProfile(values);
      setLoading(false);
      onClose?.();

      await refreshUserProfileList();
      // router.push(`/ext.userprofiles`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <Form
      footer={
        <Button block htmlType={'submit'} loading={loading} type={'primary'}>
          {t('createNew.confirm')}
        </Button>
      }
      gap={16}
      items={[
        {
          children: <Input autoFocus placeholder={t('createNew.name.placeholder')} />,
          label: t('createNew.name.placeholder'),
          name: 'name',
          rules: [{ message: t('createNew.name.required'), required: true }],
        },
        {
          children: (
            <TextArea
              placeholder={t('createNew.profile.placeholder')}
              style={{ minHeight: 120 }}
            />
          ),
          label: t('createNew.profile.placeholder'),
          name: 'profile',
          rules: [{ message: t('createNew.profile.required'), required: true }],
        },
      ]}
      itemsType={'flat'}
      layout={'vertical'}
      onFinish={onFinish}
    />
  );
});

export default CreateForm;
