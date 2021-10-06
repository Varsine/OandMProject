import React, { useRef } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { IconHover } from 'components/index';
// eslint-disable-next-line no-unused-vars
import { IS_SERVER, CHAT_PAGE_ID, CHAT_APP_ID } from 'constants/index';

import styles from './Chat.scss';

import { ChatIcon, ChatHoverIcon } from '../../../icons';

const Chat = () => {
  const chatRef = useRef(null);

  return (
    !IS_SERVER && (
      <div className={styles.wrapper}>
        <IconHover icon={<ChatIcon />} iconHover={<ChatHoverIcon />} />
        <MessengerCustomerChat
          ref={chatRef}
          appId="198907471868804"
          pageId="559202877917881"
        />
      </div>
    )
  );
};

export default Chat;
