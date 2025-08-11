import { FileTypeIcon, Icon, Text } from '@lobehub/ui';
import { createStyles, useTheme } from 'antd-style';
import { PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useCreateNewModal } from './ProfileForm';

const ICON_SIZE = 80;

const useStyles = createStyles(({ css, token }) => ({
  actionTitle: css`
    margin-block-start: 12px;
    font-size: 16px;
    color: ${token.colorTextSecondary};
  `,
  card: css`
    cursor: pointer;

    position: relative;

    overflow: hidden;

    width: 200px;
    height: 140px;
    border-radius: ${token.borderRadiusLG}px;

    font-weight: 500;
    text-align: center;

    background: ${token.colorFillTertiary};
    box-shadow: 0 0 0 1px ${token.colorFillTertiary} inset;

    transition: background 0.3s ease-in-out;

    &:hover {
      background: ${token.colorFillSecondary};
    }
  `,
  glow: css`
    position: absolute;
    inset-block-end: -12px;
    inset-inline-end: 0;

    width: 48px;
    height: 48px;

    opacity: 0.5;
    filter: blur(24px);
  `,
  icon: css`
    position: absolute;
    z-index: 1;
    inset-block-end: -24px;
    inset-inline-end: 8px;

    flex: none;
  `,
}));

interface EmptyStatusProps {
  allowAdd?: boolean;
}
const EmptyStatus = ({ allowAdd = true}: EmptyStatusProps) => {
  const { t } = useTranslation('ext.userProfile');
  const theme = useTheme();
  const { styles } = useStyles();

  const { open } = useCreateNewModal();

  return (
    <Center gap={24} height={'100%'} style={{ paddingBottom: 100 }} width={'100%'}>
      <Flexbox justify={'center'} style={{ textAlign: 'center' }}>
        <Text as={'h4'}>{t('emptyStatus.title')}</Text>
      </Flexbox>
      <Flexbox gap={12} horizontal>
        {allowAdd && (
          <Flexbox
            className={styles.card}
            onClick={() => {
              open();
            }}
            padding={16}
          >
            <span className={styles.actionTitle}>
              {t('emptyStatus.actions.profile')}
            </span>
            <div className={styles.glow} style={{ background: theme.purple }} />
            <FileTypeIcon
              className={styles.icon}
              color={theme.purple}
              icon={<Icon color={'#fff'} icon={PlusIcon} />}
              size={ICON_SIZE}
              type={'folder'}
            />
          </Flexbox>
        )}
      </Flexbox>
    </Center>
  );
};

export default EmptyStatus;
