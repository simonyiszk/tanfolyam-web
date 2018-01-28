import PropTypes from 'prop-types';
import React from 'react';

const MultipleChoiceInputGroup = ({ name, children, ...props }) => (
  <div {...props}>
    {React.Children.map(children, (input, i) =>
      React.cloneElement(input, {
        id: input.props.id != null ? input.props.id : `${name}__${i}`,
        name,
      }))}
  </div>
);

MultipleChoiceInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MultipleChoiceInputGroup;
