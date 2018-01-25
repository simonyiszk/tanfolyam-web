import PropTypes from 'prop-types';
import React from 'react';

const PostLabeledInput = ({ id, label, ...props }) => (
  <label htmlFor={id}>
    <input id={id} {...props} />
    {label}
  </label>
);

PostLabeledInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};

PostLabeledInput.defaultProps = {
  id: null,
};

export default PostLabeledInput;
