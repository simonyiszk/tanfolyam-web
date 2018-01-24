import PropTypes from 'prop-types';
import React from 'react';

const LabeledInput = ({
  id, type, name, value, label, ...props
}) => (
  <label htmlFor={id}>
    <input id={id} type={type} name={name} value={value} {...props} />
    {label}
  </label>
);

LabeledInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

LabeledInput.defaultProps = {
  id: undefined,
  name: undefined,
};

export default LabeledInput;
