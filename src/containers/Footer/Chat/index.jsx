import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { noop } from 'utils/index';
import { IconHover } from 'components/index';
import { IS_SERVER, CHAT_PAGE_ID, CHAT_APP_ID } from 'constants/index';
import { useWindowSize } from 'hooks/index';

import styles from './Chat.scss';

import { ChatIcon, ChatHoverIcon, ArrowIcon } from '../../../icons';

const Chat = ({ isOpenHandler, isOpen }) => {
  const { isMobile } = useWindowSize();

  const openChatHandler = () => {
    if (!IS_SERVER) {
      window.FB.CustomerChat.show(true);
    }
  };

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__hide]: isOpen,
      })}
    >
      {isMobile && (
        <ArrowIcon
          onClick={isOpenHandler}
          className={styles.wrapper__arrow}
          aria-label="open social links"
        />
      )}
      <MessengerCustomerChat appId={CHAT_APP_ID} pageId={CHAT_PAGE_ID} />
      <IconHover
        icon={<ChatIcon />}
        isLink={false}
        onClick={openChatHandler}
        iconHover={<ChatHoverIcon />}
        anchorProps={{
          'aria-label': 'messenger chat',
        }}
      />
    </div>
  );
};

Chat.propTypes = {
  isOpen: PropTypes.bool,
  isOpenHandler: PropTypes.func,
};

Chat.defaultProps = {
  isOpen: false,
  isOpenHandler: noop,
};

export default Chat;
