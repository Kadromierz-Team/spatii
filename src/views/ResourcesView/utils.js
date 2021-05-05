import React from 'react';
import { PageHeader, Tag } from 'antd';
import { Button } from '../../components/molecules';

const getStatusColor = (value) => {
  switch (value) {
    case 'Running':
      return 'green';
    case 'Failed':
      return 'red';
    default:
      return 'geekblue';
  }
};

const defaultColumns = (showDescribe) => [
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
        <Button
          type="link"
          text="Describe"
          onClick={() => showDescribe(value)}
        />
        <Button type="link" text="Deploy" onClick={() => showDescribe(value)} />
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

export const getColumns = (
  resourceType,
  describeFunc,
  selectResource,
  deselectResource
) => {
  return [
    ...defaultColumns(describeFunc),
    ...(resourceColumns[resourceType] || []),
  ].sort((a, b) => a.order - b.order);
};
