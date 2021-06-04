import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { IS_SERVER } from 'constants/index';

import IconHover from '../IconHover';
import { MessengerIcon, MessengerHoverIcon } from '../../icons';

const Chat = () => {
  const openChatHandler = () => {
    if (!IS_SERVER) {
      window.FB.CustomerChat.show(true);
    }
  };

  return (
    <div>
      <MessengerCustomerChat pageId="559202877917881" appId="198907471868804" />
      <IconHover
        icon={<MessengerIcon />}
        isLink={false}
        onClick={openChatHandler}
        iconHover={<MessengerHoverIcon />}
        anchorProps={{
          'aria-label': 'messenger chat',
        }}
      />
    </div>
  );
};

export default Chat;
