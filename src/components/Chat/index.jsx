import React from 'react';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

// import MessengerCustomerChat from 'react-messenger-customer-chat';
import styles from './Chat.scss';

import { ChatIcon, ChatDarkIcon } from '../../icons';

const Chat = () => {
  const isDarkMode = useSelector(modeSelector);

  const currentIcon = isDarkMode ? <ChatDarkIcon /> : <ChatIcon />;

  return <div className={styles.wrapper}>{currentIcon}</div>;
};

export default Chat;
