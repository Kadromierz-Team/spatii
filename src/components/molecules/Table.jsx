import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

const Table = ({ data, ...props }) => <AntTable dataSource={data} {...props} />;

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.key,
    })
  ),
};

export default Table;
