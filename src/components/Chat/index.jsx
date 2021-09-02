import React from 'react';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

// import MessengerCustomerChat from 'react-messenger-customer-chat';
import styles from './Chat.scss';

import { ChatIcon, ChatDarkIcon } from '../../icons';

const Chat = () => {
  const isDarkMode = useSelector(modeSelector);

  // const openChatHandler = () => {
  //   if (!IS_SERVER) {
  //     window.FB.CustomerChat.show(true);
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      {/* <MessengerCustomerChat pageId="559202877917881" appId="198907471868804" />
      <IconHover
        icon={<MessengerIcon />}
        isLink={false}
        onClick={openChatHandler}
        iconHover={<MessengerHoverIcon />}
        anchorProps={{
          'aria-label': 'messenger chat',
        }}
      /> */}
      {isDarkMode ? <ChatDarkIcon /> : <ChatIcon />}
    </div>
  );
};

export default Chat;
