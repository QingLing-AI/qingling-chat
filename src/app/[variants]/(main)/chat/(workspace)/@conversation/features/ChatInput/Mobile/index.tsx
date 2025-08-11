'use client';

import { Alert } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import {
  type ActionKey,
  type ActionKeys,
  MobileChatInput as ChatInput,
  ChatInputProvider,
} from '@/features/ChatInput';
import { isQinglingCustomized } from '@/const/branding'
import { useChatStore } from '@/store/chat';
import { aiChatSelectors } from '@/store/chat/selectors';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

import { useSend, useSendGroupMessage } from '../useSend';

const leftActions: ActionKeys[] = isQinglingCustomized ? [
  'model',
  'search',
  'fileUpload',
  'knowledgeBase',
  'tools',
  '---',
  [/* 'params', 'history',  */'stt', 'clear'],
  // 'mainToken',
] : [
  'model',
  'search',
  'fileUpload',
  'knowledgeBase',
  'tools',
  '---',
  ['params', 'history', 'stt', 'clear'],
  'mainToken',
  'mention',
];

const rightActions: ActionKey[] = ['saveTopic'];

const MobileChatInput = memo(() => {
  const { t } = useTranslation('chat');
  const { send, disabled, generating, stop } = useSend();
  const { send: sendGroupMessage } = useSendGroupMessage();

  const isSessionGroup = useSessionStore(sessionSelectors.isCurrentSessionGroupSession);

  const { enableSTT } = useServerConfigStore(featureFlagsSelectors);
  const [mainInputSendErrorMsg, clearSendMessageError] = useChatStore((s) => [
    aiChatSelectors.isCurrentSendMessageError(s),
    s.clearSendMessageError,
  ]);
  return (
    <ChatInputProvider
      chatInputEditorRef={(instance) => {
        if (!instance) return;
        useChatStore.setState({ mainInputEditor: instance });
      }}
      leftActions={enableSTT ? leftActions : leftActions.filter((action) => action !== 'stt')}
      mobile
      onMarkdownContentChange={(content) => {
        useChatStore.setState({ inputMessage: content });
      }}
      onSend={() => {
        if (isSessionGroup) {
          sendGroupMessage();
        } else {
          send();
        }
      }}
      rightActions={rightActions}
      sendButtonProps={{ disabled, generating, onStop: stop }}
    >
      {mainInputSendErrorMsg && (
        <Flexbox paddingBlock={'0 6px'} paddingInline={12}>
          <Alert
            closable
            message={t('input.errorMsg', { errorMsg: mainInputSendErrorMsg })}
            onClose={clearSendMessageError}
            type={'warning'}
          />
        </Flexbox>
      )}
      <ChatInput />
    </ChatInputProvider>
  );
});

MobileChatInput.displayName = 'MobileChatInput';

export default MobileChatInput;
