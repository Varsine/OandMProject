import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';
import { Button } from 'components/index';

import { SuccessIcon } from '../../../../../icons';
import styles from '../Apply.scss';

const Success = ({ doneSummary }) => (
  <div className={styles.success}>
    <SuccessIcon />
    <h1 className={styles.success__title}>
      Your application successfully submitted!
    </h1>
    <Button onClick={doneSummary} className={styles.success__link}>
      Done
    </Button>
  </div>
);

Success.propTypes = {
  doneSummary: PropTypes.func,
};

Success.defaultProps = {
  doneSummary: noop,
};

export default Success;
