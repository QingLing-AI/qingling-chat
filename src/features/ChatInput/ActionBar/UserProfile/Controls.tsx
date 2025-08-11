import { Icon, } from '@lobehub/ui';
// import { Divider } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';
import { Check, UserRoundX } from 'lucide-react';
import UpdateLoading from '@/components/Loading/UpdateLoading';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { extUserProfileSelectors } from '@/store/agent/selectors';
import { UserProfileItem } from '@/types/ext/userProfile';


const useStyles = createStyles(({ css, token }) => ({
  active: css`
    background: ${token.colorFillTertiary};
  `,
  // check: css`
  //   margin-inline-start: 12px;
  //   font-size: 16px;
  //   color: ${token.colorPrimary};
  // `,
  // description: css`
  //   font-size: 12px;
  //   color: ${token.colorTextDescription};
  // `,
  icon: css`
    border: 1px solid ${token.colorFillTertiary};
    border-radius: ${token.borderRadius}px;
    background: ${token.colorBgElevated};
  `,
  option: css`
    cursor: pointer;

    width: 100%;
    padding-block: 4px;
    padding-inline: 4px;
    border-radius: ${token.borderRadius}px;

    transition: background-color 0.2s;

    &:hover {
      background: ${token.colorFillTertiary};
    }
  `,
  title: css`
    font-size: 14px;
    line-height: 32px;
    font-weight: 500;
    color: ${token.colorText};
  `,
}));

const Controls = ({
  options,
  setUpdating
}: {
  options: UserProfileItem[],
  setUpdating: (updating: boolean) => void,
}) => {
  const { t } = useTranslation('chat');

  const [loading, setLoading] = useState<{ id: string | null }|null>(null);
  const { cx, styles, theme } = useStyles();
  const [setActiveExtUserProfile, currentProfile] = useAgentStore((s) => [
    s.setActiveExtUserProfile,
    extUserProfileSelectors.currentAgentExtUserProfile(s),
  ])

  const noUserProfile = {
    avatar: <Icon icon={UserRoundX} size={16} />,
    id: null,
    name: t('userProfile.clearProfile'),
  }

  return (
    <Flexbox gap={4}>
      {[noUserProfile, ...options].map(({id, name, avatar}) => {
        const isActive = (currentProfile?.id||null) === id
        return (
          <Flexbox
            align={'flex-start'}
            className={cx(styles.option, isActive && styles.active)}
            gap={12}
            horizontal
            key={id}
            onClick={() => {
              setUpdating(true)
              setLoading({id})
              setActiveExtUserProfile(id).finally(() => {
                setLoading(null)
                setUpdating(false)
              })
            }}
          >
            <Center className={styles.icon} flex={'none'} height={32} width={32}>
              {/* <Icon icon={Check} /> */}
              <div>{avatar || '🎭'}</div>
            </Center>
            <Flexbox align={"center"} distribution='space-between' flex={1} horizontal>
              <div className={styles.title}>{name}</div>
              {/* <div className={styles.description}>{profile}</div> */}
              {loading && loading.id === id ? <UpdateLoading style={{ color: theme.colorTextSecondary }} /> : (isActive && <Icon icon={Check} />)}
            </Flexbox>
          </Flexbox>
         )
      })}
      {/* <Divider style={{ margin: 0 }} /> */}
      {/* todo add link */}
    </Flexbox>
  );
};

export default Controls;
