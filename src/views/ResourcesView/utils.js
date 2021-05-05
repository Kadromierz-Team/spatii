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

const defaultColumns = (showDescribe, allStatuses) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    order: 1,
    sorter: {
      compare: (a, b) => (a.name > b.name ? 1 : -1),
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => <Tag color={getStatusColor(value)}>{value}</Tag>,
    order: 2,
    sorter: {
      compare: (a, b) => (a.status > b.status ? 1 : -1),
    },
    filters: allStatuses,
    onFilter: (value, record) => record.status.includes(value),
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
  pods: [
    {
      title: 'Image tag',
      key: 'imageTag',
      dataIndex: 'imageTag',
      order: 3,
      sorter: {
        compare: (a, b) => (a.imageTag > b.imageTag ? 1 : -1),
      },
    },
    {
      title: 'Restart count',
      key: 'restartCount',
      dataIndex: 'restartCount',
      order: 4,
      sorter: {
        compare: (a, b) => (a.restartCount > b.restartCount ? 1 : -1),
      },
    },
    {
      title: 'Started At',
      key: 'startedAt',
      dataIndex: 'startedAt',
      order: 5,
      sorter: {
        compare: (a, b) => (a.startedAt > b.startedAt ? 1 : -1),
      },
    },
  ],
};

export const getColumns = (resourceType, describeFunc, allStatuses) => {
  return [
    ...defaultColumns(describeFunc, allStatuses),
    ...(resourceColumns[resourceType] || []),
  ].sort((a, b) => a.order - b.order);
};
