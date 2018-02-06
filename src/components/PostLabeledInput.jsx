import PropTypes from 'prop-types';
import React from 'react';
import styles from './PostLabeledInput.module.scss';

const PostLabeledInput = ({ id, label, ...props }) => (
  <label htmlFor={id} className={styles.labeledInput}>
    <input id={id} {...props} />
    <span>{label}</span>
  </label>
);

PostLabeledInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};

PostLabeledInput.defaultProps = {
  id: null,
};

export default PostLabeledInput;
