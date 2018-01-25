import PropTypes from 'prop-types';
import React from 'react';
import PostLabeledInput from './PostLabeledInput';

const RadioButton = ({ value, label, ...props }) => (
  <PostLabeledInput
    type="radio"
    value={value}
    label={label != null ? label : value}
    {...props}
  />
);

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

RadioButton.defaultProps = {
  label: null,
};

export default RadioButton;
