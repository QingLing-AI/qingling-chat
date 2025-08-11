import { Button, Form, Input, TextArea } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { CreateUserProfileParams, UserProfileItem } from '@/types/ext/userProfile';

interface BaseFormProps {
  initialValues?: Partial<UserProfileItem>;
  onCancel?: () => void;
  onSubmit: (values: CreateUserProfileParams) => Promise<void>;
  submitButtonText: string;
  submitting?: boolean;
}

const BaseForm = memo<BaseFormProps>(
  ({ initialValues, onSubmit, submitButtonText, submitting }) => {
    const { t } = useTranslation('ext.userProfile');

    return (
      <Form
        footer={
          <Flexbox gap={12} horizontal>
            {/* <Button
              onClick={() => {
                onCancel?.();
              }}
              style={{ flex: 1 }}
            >
              {t('cancel', { ns: 'common' })}
            </Button> */}
            <Button
              block
              htmlType={'submit'}
              loading={submitting}
              style={{ flex: 1 }}
              type={'primary'}
            >
              {submitButtonText}
            </Button>
          </Flexbox>
        }
        gap={8}
        initialValues={initialValues}
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
        onFinish={onSubmit}
        styles={{
          item: {
            paddingBlock: 8,
          },
        }}
      />
    );
  },
);

export default BaseForm;
