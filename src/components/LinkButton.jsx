import PropTypes from 'prop-types';
import React from 'react';
import styles from './LinkButton.module.scss';

const LinkButton = ({ href, children, className, ...props }) => (
  <a
    href={href}
    role="button"
    className={`${styles.root} ${className}`}
    {...props}
  >
    {children}
  </a>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LinkButton.defaultProps = {
  className: '',
};

export default LinkButton;
