import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { noop } from 'utils/index';
import { IconHover } from 'components/index';
import { useWindowSize } from 'hooks/index';
import { IS_SERVER, CHAT_PAGE_ID, CHAT_APP_ID } from 'constants/index';

import styles from './Chat.scss';

import { ChatIcon, ChatHoverIcon, ArrowIcon } from '../../../icons';

const Chat = ({ isOpenHandler, isOpen }) => {
  const { isMobile } = useWindowSize();
  const [showChat, setShowChat] = useState(false);

  const openChatHandler = () => {
    if (!IS_SERVER) {
      window.FB.CustomerChat.show(true);
    }
  };

  useEffect(() => {
    setShowChat(true);
  }, []);

  const wrapperClassNames = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles.wrapper__hide]: isOpen,
      }),
    [isOpen],
  );

  return (
    <div className={wrapperClassNames}>
      {isMobile && (
        <ArrowIcon
          onClick={isOpenHandler}
          className={styles.wrapper__arrow}
          aria-label="open social links"
        />
      )}
      {showChat && (
        <MessengerCustomerChat
          appId={CHAT_APP_ID}
          pageId={CHAT_PAGE_ID}
          htmlRef="chat"
        />
      )}

      <IconHover
        icon={<ChatIcon />}
        isLink={false}
        onClick={openChatHandler}
        iconHover={<ChatHoverIcon />}
        anchorProps={{
          rel: 'noreferrer',
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
