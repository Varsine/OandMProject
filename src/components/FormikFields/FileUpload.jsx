import React from 'react';
import PropTypes from 'prop-types';

import styles from 'components/Field/Field.scss';
import TextError from 'components/FormikFields/TextError';

import { FileIcon } from '~/src/icons';

const FileUpload = ({
  label,
  placeholder,
  field: { name, value },
  form: { touched, errors, setFieldValue },
}) => {
  const handleUploadFile = (e) => {
    if (e?.currentTarget?.files && e?.currentTarget?.files[0]) {
      setFieldValue(name, e.currentTarget.files[0]);
    }
  };

  return (
    <div className={styles.file__wrapper}>
      <span className={styles.label}>{label}</span>
      <label htmlFor={name} className={styles.file}>
        <p className={styles.file__text}>{value?.name || 'Attach file'}</p>
        <input
          id={name}
          type="file"
          onChange={handleUploadFile}
          className={styles.file__checked}
          placeholder={placeholder}
          accept="application/pdf, image/jpeg, image/png, image/jpg, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        <FileIcon />
      </label>
      {touched[name] && errors[name] && (
        <TextError component={TextError} message={errors[name]} />
      )}
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
};

FileUpload.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  field: {},
  form: {},
};

export default FileUpload;
