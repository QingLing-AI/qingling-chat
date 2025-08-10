'use client';

import { Text } from '@lobehub/ui';
import { createStyles } from 'antd-style';
// import { useQueryState } from 'nuqs';
import { rgba } from 'polished';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';
import { Virtuoso } from 'react-virtuoso';

import { useUserProfileStore } from '@/store/ext/userProfile';
// import { SortType } from '@/types/ext/userProfile';

import EmptyStatus from './EmptyStatus';
import ProfileListItem, { PROFILE_DATE_WIDTH, PROFILE_NAME_WIDTH } from './ProfileListItem';
import ProfileSkeleton from './ProfileSkeleton';
import ToolBar from './ToolBar';

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  header: css`
    height: 40px;
    min-height: 40px;
    border-block-end: 1px solid ${isDarkMode ? token.colorSplit : rgba(token.colorSplit, 0.06)};
    color: ${token.colorTextDescription};
  `,
  headerItem: css`
    padding-block: 0;
    padding-inline: 0 24px;
  `,
  total: css`
    padding-block-end: 12px;
    border-block-end: 1px solid ${isDarkMode ? token.colorSplit : rgba(token.colorSplit, 0.06)};
  `,
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileListProps {
}

// eslint-disable-next-line no-empty-pattern
const ProfileList = memo<ProfileListProps>(({ }) => {
  const { t } = useTranslation('ext.userProfile');
  const { styles } = useStyles();

  const [selectFileIds, setSelectedFileIds] = useState<string[]>([]);

  // const [query] = useQueryState('q', {
  //   clearOnDefault: true,
  // });

  // const [sorter] = useQueryState('sorter', {
  //   clearOnDefault: true,
  //   defaultValue: 'createdAt',
  // });
  // const [sortType] = useQueryState('sortType', {
  //   clearOnDefault: true,
  //   defaultValue: SortType.Desc,
  // });

  const useFetchUserProfileList = useUserProfileStore((s) => s.useFetchUserProfileList);

  const { data, isLoading } = useFetchUserProfileList({
    // q: query,
    // sortType,
    // sorter,
  });

  return !isLoading && data?.length === 0 ? (
    <EmptyStatus />
  ) : (
    <Flexbox height={'100%'}>
      <Flexbox style={{ fontSize: 12, marginInline: 24 }}>
        <ToolBar
          key={selectFileIds.join('-')}
          selectCount={selectFileIds.length}
          selectFileIds={selectFileIds}
          setSelectedFileIds={setSelectedFileIds}
          total={data?.length}
          totalFileIds={data?.map((item) => item.id) || []}
        />
        <Flexbox align={'center'} className={styles.header} horizontal paddingInline={8}>
          <Flexbox className={styles.headerItem} style={{paddingLeft: '36px'}} width={PROFILE_NAME_WIDTH}>
            {t('ProfileManager.title.name')}
          </Flexbox>
          <Flexbox className={styles.headerItem} flex={1} style={{ paddingInline: 8 }}>
            {t('ProfileManager.title.profile')}
          </Flexbox>
          <Flexbox className={styles.headerItem} width={PROFILE_DATE_WIDTH}>
            {t('ProfileManager.title.createdAt')}
          </Flexbox>
        </Flexbox>
      </Flexbox>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <Virtuoso
          components={{
            Footer: () => (
              <Center style={{ height: 64 }}>
                <Text style={{ fontSize: 12 }} type={'secondary'}>
                  {t('ProfileManager.bottom')}
                </Text>
              </Center>
            ),
          }}
          data={data}
          itemContent={(index, item) => (
            <ProfileListItem
              index={index}
              key={item.id}
              onSelectedChange={(id, checked) => {
                setSelectedFileIds((prev) => {
                  if (checked) {
                    return [...prev, id];
                  }
                  return prev.filter((item) => item !== id);
                });
              }}
              selected={selectFileIds.includes(item.id)}
              {...item}
            />
          )}
          style={{ flex: 1 }}
        />
      )}
    </Flexbox>
  );
});

export default ProfileList;
