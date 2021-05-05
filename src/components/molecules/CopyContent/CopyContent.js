import React from 'react';
import PropTypes from 'prop-types';
import {CopyOutlined} from '@ant-design/icons';

const CopyContent = ({children, value})=>{
  return <span
    className={"copyContent_wrapper"}
    onClick={()=>{navigator.clipboard.writeText(value)}}>
    {children}
    <CopyOutlined  className="copyContent_icon"/></span>
}

CopyContent.propTypes={
  children: PropTypes.node,
  value: PropTypes.string,
}

export default CopyContent;
