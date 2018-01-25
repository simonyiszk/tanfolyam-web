import PropTypes from 'prop-types';
import React from 'react';
import PostLabeledInput from './PostLabeledInput';

const Checkbox = ({ value, label, ...props }) => (
  <PostLabeledInput
    type="checkbox"
    value={value}
    label={label != null ? label : value}
    {...props}
  />
);

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  label: null,
};

export default Checkbox;
