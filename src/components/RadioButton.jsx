import PropTypes from 'prop-types';
import React from 'react';

const RadioButton = ({
  id, name, value, label, ...props
}) => (
  <label htmlFor={id}>
    <input id={id} type="radio" name={name} value={value} {...props} />
    {label != null ? label : value}
  </label>
);

RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

RadioButton.defaultProps = {
  id: undefined,
  name: undefined,
  label: undefined,
};

export default RadioButton;
