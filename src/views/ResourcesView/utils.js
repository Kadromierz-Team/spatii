import React from 'react';
import { PageHeader, Checkbox, Tag } from 'antd';
import { Button } from '../../components/molecules';

const getStatusColor = (value) => {
  switch (value) {
    case 'OK':
      return 'green';
    case 'NOT OK':
      return 'red';
    default:
      return 'geekblue';
  }
};

const defaultColumns = [
  {
    title: '',
    dataIndex: 'isSelected',
    key: 'isSelected',
    render: (value) => <Checkbox checked={value} />,
    order: 0,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    order: 1,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => <Tag color={getStatusColor(value)}>{value}</Tag>,
    order: 2,
  },
  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
    render: (value) => (
      <div>
        <Button type="link" text="Describe" />
        <Button type="link" text="Deploy" />
      </div>
    ),
    order: 100,
  },
];

const resourceColumns = {
  pod: [
    {
      title: 'Image tag',
      key: 'imageTag',
      dataIndex: 'imageTag',
      order: 3,
    },
  ],
};

export const getColumns = (resourceType) => {
  return [...defaultColumns, ...(resourceColumns[resourceType] || [])].sort(
    (a, b) => a.order - b.order
  );
};
