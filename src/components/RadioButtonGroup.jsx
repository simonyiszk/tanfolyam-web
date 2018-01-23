import PropTypes from 'prop-types';
import React from 'react';

const RadioButtonGroup = ({ name, children, ...props }) => (
  <div {...props}>
    {React.Children.map(children, (radioButton, i) =>
      React.cloneElement(radioButton, {
        id: `${name}Choice${i}`,
        name,
      }))}
  </div>
);

RadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default RadioButtonGroup;
