import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';

const Select = ({
  mode,
  onChange,
  disabled,
  placeholder,
  defaultValue,
  searchValue,
  onSearchInputChange,
  value,
  loading = false,
  children,
}) => (
  <AntSelect
    mode={mode}
    onChange={onChange}
    disabled={disabled}
    placeholder={placeholder}
    defaultValue={defaultValue}
    allowClear
    onSearch={onSearchInputChange}
    searchValue={searchValue}
    value={value}
    loading={loading}
    style={{ width: '100%' }}
  >
    {children}
  </AntSelect>
);

Select.propTypes = {
  mode: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchInputChange: PropTypes.func,
  value: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default Select;
