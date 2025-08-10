'use client';

import { Text } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ProfileList from './ProfileList';
import { useTranslation } from 'react-i18next';

const UserProfileManager = memo(() => {
  const { t } = useTranslation("ext.userProfile")
  return (
    // <>
    //   <Header knowledgeBaseId={knowledgeBaseId} />
    //   <Flexbox gap={12} height={'100%'}>
    //     <Text strong style={{ fontSize: 16, marginBlock: 16, marginInline: 24 }}>
    //       {title}
    //     </Text>
    //     <FileList category={category} knowledgeBaseId={knowledgeBaseId} />
    //   </Flexbox>
    //   <UploadDock />
    //   <ChunkDrawer />
    // </>
    <Flexbox gap={12} height={'100%'}>
      <Text strong style={{ fontSize: 16, marginBlock: 16, marginInline: 24 }}>
        {t("title")}
      </Text>
      <ProfileList/>
    </Flexbox>
  );
});

export default UserProfileManager;
