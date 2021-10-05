import React from 'react';
import { Chat } from '@styled-icons/fluentui-system-filled/Chat';

import styles from './Chat.scss';
// import { useSelector } from 'react-redux';

// import { modeSelector } from 'slices/mainSlice';

// // import MessengerCustomerChat from 'react-messenger-customer-chat';

// import { ChatIcon, ChatDarkIcon } from '../../icons';
const ChatIcon = () => {
  //   const isDarkMode = useSelector(modeSelector);

  //   const currentIcon = isDarkMode ? <ChatDarkIcon /> : <ChatIcon />;
  return (
    <div className={styles.wrapper}>
      <Chat width={40} height={40} fill="#4A52BE" />
    </div>
  );
};

export default ChatIcon;
