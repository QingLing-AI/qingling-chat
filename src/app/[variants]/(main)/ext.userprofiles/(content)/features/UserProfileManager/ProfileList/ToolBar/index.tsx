import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useUserProfileStore } from '@/store/ext/userProfile';

import MultiSelectActions, { MultiSelectActionType } from './MultiSelectActions';
import { useCreateNewModal } from '../../CreateNew';

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  container: css`
    height: 40px;
    padding-block-end: 12px;
    border-block-end: 1px solid ${isDarkMode ? token.colorSplit : rgba(token.colorSplit, 0.06)};
  `,
}));

interface MultiSelectActionsProps {
  selectCount: number;
  selectFileIds: string[];
  setSelectedFileIds: (ids: string[]) => void;
  total?: number;
  totalFileIds: string[];
}

const ToolBar = memo<MultiSelectActionsProps>(
  ({
    selectCount,
    setSelectedFileIds,
    selectFileIds,
    total,
    totalFileIds,
  }) => {
    const { styles } = useStyles();
    const { open } = useCreateNewModal();

    const [removeManyProfiles] = useUserProfileStore((s) => [
      // s.removeUserProfile,
      s.removeManyUserProfiles,
      // s.activeUserProfileItems,
    ]);

    // const { open } = useAddFilesToKnowledgeBaseModal();

    const onActionClick = async (type: MultiSelectActionType) => {
      switch (type) {
        case 'delete': {
          await removeManyProfiles(selectFileIds);
          setSelectedFileIds([]);
          return;
        }

        case 'create': {
          open()
          return;
        }
      }
    };

    return (
      <Flexbox align={'center'} className={styles.container} horizontal justify={'space-between'}>
        <MultiSelectActions
          onActionClick={onActionClick}
          onClickCheckbox={() => {
            setSelectedFileIds(selectCount === total ? [] : totalFileIds);
          }}
          selectCount={selectCount}
          total={total}
        />
      </Flexbox>
    );
  },
);

export default ToolBar;
