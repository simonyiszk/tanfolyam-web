import PropTypes from 'prop-types';
import React from 'react';

const InputGroup = ({
  name, legend, children, ...props
}) => (
  <fieldset {...props}>
    {legend != null && <legend>{legend}</legend>}

    {React.Children.map(children, (input, i) =>
      React.cloneElement(input, {
        id: `${name}__${i}`,
        name,
      }))}
  </fieldset>
);

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

InputGroup.defaultProps = {
  legend: undefined,
};

export default InputGroup;
