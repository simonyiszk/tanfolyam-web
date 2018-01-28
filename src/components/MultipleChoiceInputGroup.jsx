import PropTypes from 'prop-types';
import React from 'react';

const MultipleChoiceInputGroup = ({
  name, legend, children, ...props
}) => (
  <fieldset {...props}>
    {legend != null && <legend>{legend}</legend>}

    {React.Children.map(children, (input, i) =>
      React.cloneElement(input, {
        id: input.props.id != null ? input.props.id : `${name}__${i}`,
        name,
      }))}
  </fieldset>
);

MultipleChoiceInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

MultipleChoiceInputGroup.defaultProps = {
  legend: null,
};

export default MultipleChoiceInputGroup;
