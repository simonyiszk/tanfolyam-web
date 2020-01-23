import PropTypes from 'prop-types';
import React from 'react';
import styles from './MultipleChoiceInputGroup.module.scss';

const MultipleChoiceInputGroup = ({ name, children, className, ...props }) => (
  <div className={`${styles.root} ${className}`} {...props}>
    {React.Children.map(children, (input, i) =>
      React.cloneElement(input, {
        id: input.props.id != null ? input.props.id : `${name}__${i}`,
        name,
      }),
    )}
  </div>
);

MultipleChoiceInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
};

MultipleChoiceInputGroup.defaultProps = {
  className: '',
};
export default MultipleChoiceInputGroup;
