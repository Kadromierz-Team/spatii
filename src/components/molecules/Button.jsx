import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';

const Button = ({ type = 'primary', text, onClick, disabled, icon }) => {
  return (
    <AntButton type={type} onClick={onClick} disabled={disabled} icon={icon}>
      {text}
    </AntButton>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
};

export default Button;
