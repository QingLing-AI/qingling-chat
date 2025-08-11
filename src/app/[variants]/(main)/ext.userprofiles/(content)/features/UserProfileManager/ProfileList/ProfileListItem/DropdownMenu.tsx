import { ActionIcon, Dropdown, Icon, } from '@lobehub/ui';
import { App } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import {
  Edit,
  MoreHorizontalIcon,
  Trash,
} from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserProfileStore } from '@/store/ext/userProfile';
import { UserProfileItem } from '@/types/ext/userProfile';
import { useEditModal } from '../ProfileForm';

interface DropdownMenuProps {
  userProfile: UserProfileItem;
}

const DropdownMenu = memo<DropdownMenuProps>(({ userProfile }) => {
  const { t } = useTranslation(['ext.userProfile', 'common']);
  const { modal } = App.useApp();
  const { open: openEditModal } = useEditModal();

  const [removeUserProfile] = useUserProfileStore((s) => [
    s.removeUserProfile,
  ]);


  const items = useMemo(() => {
    return (
      [
        {
          icon: <Icon icon={Edit} />,
          key: 'edit',
          label: t('edit', { ns: 'common' }),
          onClick: async ({ domEvent }) => {
            domEvent.stopPropagation();
            openEditModal(userProfile!);
          },
        },
        {
          danger: true,
          icon: <Icon icon={Trash} />,
          key: 'delete',
          label: t('delete', { ns: 'common' }),
          onClick: async ({ domEvent }) => {
            domEvent.stopPropagation();
            modal.confirm({
              content: t('ProfileManager.actions.confirmDelete', { ns: 'ext.userProfile' }),
              okButtonProps: { danger: true },
              onOk: async () => {
                await removeUserProfile(userProfile.id);
              },
            });
          },
        },
      ] as ItemType[]
    ).filter(Boolean);
  }, []);

  return (
    <Dropdown menu={{ items }}>
      <ActionIcon icon={MoreHorizontalIcon} size={'small'} />
    </Dropdown>
  );
});

export default DropdownMenu;
