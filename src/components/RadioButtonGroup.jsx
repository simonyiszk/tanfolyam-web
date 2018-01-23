import PropTypes from 'prop-types';
import React from 'react';

const RadioButtonGroup = ({
  name, legend, children, ...props
}) => (
  <fieldset {...props}>
    {legend && <legend>{legend}</legend>}

    {React.Children.map(children, (radioButton, i) =>
      React.cloneElement(radioButton, {
        id: `${name}Choice${i}`,
        name,
      }))}
  </fieldset>
);

RadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

RadioButtonGroup.defaultProps = {
  legend: undefined,
};

export default RadioButtonGroup;
