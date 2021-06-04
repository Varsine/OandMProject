import React from 'react';

import { IconHover } from 'components/index';
import { linksInformation } from 'utils/index';

import styles from '../Footer.scss';

const SocialLinks = () => {
  const renderSocialLinks = linksInformation.map(
    ({ id, url, icon, iconHover, ariaLabel }) => (
      <IconHover
        key={id}
        url={url}
        icon={icon}
        iconHover={iconHover}
        className={styles.links__item}
        anchorProps={{
          target: '_blank',
          'aria-label': ariaLabel,
        }}
      />
    ),
  );

  return <div className={styles.links}>{renderSocialLinks}</div>;
};

export default SocialLinks;
