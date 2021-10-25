import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { FormikInput, FormikSelect } from 'components/index';

const FormikControl = ({ control, rest }) => {
  switch (control) {
    case 'input':
      return <Field name={rest.name} {...rest} component={FormikInput} />;

    case 'select':
      return <FormikSelect {...rest} />;

    default:
      return null;
  }
};

FormikControl.propTypes = {
  rest: PropTypes.any,
  control: PropTypes.string,
};

FormikControl.defaultProps = {
  rest: {},
  control: '',
};
export default FormikControl;
