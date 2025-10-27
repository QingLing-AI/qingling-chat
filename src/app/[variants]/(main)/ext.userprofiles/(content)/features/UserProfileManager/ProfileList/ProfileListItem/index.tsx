import { Checkbox } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import { FileBoxIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { rgba } from 'polished';
import { memo } from 'react';
// import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { UserProfileItem } from '@/types/ext/userProfile';
import { Tooltip } from '@lobehub/ui';
import DropdownMenu from './DropdownMenu';


dayjs.extend(relativeTime);

export const PROFILE_DATE_WIDTH = 160;
export const PROFILE_NAME_WIDTH = 200;

const useStyles = createStyles(({ css, token, cx, isDarkMode }) => {
  const hover = css`
    opacity: 0;
  `;
  return {
    checkbox: hover,
    container: css`
      margin-inline: 24px;
      border-block-end: 1px solid ${isDarkMode ? token.colorSplit : rgba(token.colorSplit, 0.06)};
      border-radius: ${token.borderRadius}px;

      &:hover {
        background: ${token.colorFillTertiary};

        .${cx(hover)} {
          opacity: 1;
        }
      }

      .chunk-tag {
        opacity: 1;
      }
    `,

    hover,
    item: css`
      padding-block: 0;
      padding-inline: 0 24px;
      color: ${token.colorTextSecondary};
    `,
    name: css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;

      margin-inline-start: 12px;

      color: ${token.colorText};
    `,
    selected: css`
      background: ${token.colorFillTertiary};

      &:hover {
        background: ${token.colorFillSecondary};
      }
    `,
  };
});

interface ProfileRenderItemProps {
  index: number;
  onSelectedChange: (id: string, selected: boolean) => void;
  selected?: boolean;
  userProfile: UserProfileItem;
}

const ProfileRenderItem = memo<ProfileRenderItemProps>(
  ({
    userProfile,
    selected,
    onSelectedChange,
  }) => {
    // const { t } = useTranslation('ext.userProfile');
    const { styles, cx } = useStyles();
    const {
      id,
      name,
      createdAt,
      profile
    } = userProfile;
    // const router = useRouter();

    const displayTime =
      dayjs().diff(dayjs(createdAt), 'd') < 7
        ? dayjs(createdAt).fromNow()
        : dayjs(createdAt).format('YYYY-MM-DD');

    return (
      <Flexbox
        align={'center'}
        className={cx(styles.container, selected && styles.selected)}
        height={48}
        horizontal
        paddingInline={8}
      >
        <Flexbox
          align={'center'}
          className={styles.item}
          distribution={'space-between'}
          horizontal
          onClick={() => {
            // router.push(`/ext.userProfiles/${id}`);
          }}
          width={PROFILE_NAME_WIDTH}
        >
          <Flexbox align={'center'} horizontal>
            <Center
              height={32}
              onClick={(e) => {
                e.stopPropagation();

                onSelectedChange(id, !selected);
              }}
              style={{ paddingInline: 4 }}
            >
              <Checkbox
                checked={selected}
                className={selected ? '' : styles.hover}
                style={{ borderRadius: '50%' }}
              />
            </Center>
            {/* avatar or icon */}
            <span className={styles.name}><Tooltip title={name}>{name}</Tooltip></span>
          </Flexbox>
          <Flexbox
            align={'center'}
            gap={8}
            horizontal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.hover}>
              <DropdownMenu userProfile={userProfile} />
            </div>
          </Flexbox>
        </Flexbox>

        <Flexbox className={styles.item}
          flex={1}
          horizontal>
          <Tooltip title={profile}>{profile}</Tooltip>
        </Flexbox>

        <Flexbox className={styles.item} width={PROFILE_DATE_WIDTH}>
          {displayTime}
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ProfileRenderItem;
