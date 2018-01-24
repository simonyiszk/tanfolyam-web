import PropTypes from 'prop-types';
import React from 'react';
import LabeledInput from './LabeledInput';

const Checkbox = ({ value, label, ...props }) => (
  <LabeledInput
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
  label: undefined,
};

export default Checkbox;
