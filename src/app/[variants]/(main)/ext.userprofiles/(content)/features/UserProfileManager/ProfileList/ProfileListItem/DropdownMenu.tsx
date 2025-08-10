import { ActionIcon, Dropdown, Icon, } from '@lobehub/ui';
import { App } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import {
  MoreHorizontalIcon,
  Trash,
} from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserProfileStore } from '@/store/ext/userProfile';

interface DropdownMenuProps {
  id: string;
  name?: string;
}

const DropdownMenu = memo<DropdownMenuProps>(({ id }) => {
  const { t } = useTranslation(['ext.userProfile', 'common']);
  const { modal } = App.useApp();

  const [removeUserProfile] = useUserProfileStore((s) => [
    s.removeUserProfile,
  ]);


  const items = useMemo(() => {
    return (
      [
        {
          danger: true,
          icon: <Icon icon={Trash} />,
          key: 'delete',
          label: t('delete', { ns: 'common' }),
          onClick: async ({ domEvent }) => {
            domEvent.stopPropagation();
            modal.confirm({
              content: t('ProfileManager.actions.confirmDelete'),
              okButtonProps: { danger: true },
              onOk: async () => {
                await removeUserProfile(id);
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
