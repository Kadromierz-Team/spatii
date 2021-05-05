import React from 'react';
import { PageHeader, Tag } from 'antd';
import { Button, CopyContent } from '../../components/molecules';

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

const defaultColumns = (showDescribe, allStatuses, deletePod) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    order: 1,
    sorter: {
      compare: (a, b) => (a.name > b.name ? 1 : -1),
    },
    render: (name) => <CopyContent value={name}>{name}</CopyContent>,
  },

  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
    render: (value, record) => {
      return (
        <div>
          <Button
            type="link"
            text="Describe"
            onClick={() => showDescribe(value)}
          />
          {record.kind === 'Pod' && (
            <Button
              danger
              type="link"
              text="Delete"
              onClick={() => deletePod(record.name, record.namespace)}
            />
          )}
        </div>
      );
    },
    order: 100,
  },
];

const getResourceColumns = (allStatuses) => ({
  pods: [
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
      title: 'Image tag',
      key: 'imageTag',
      dataIndex: 'imageTag',
      order: 3,
      sorter: {
        compare: (a, b) => (a.imageTag > b.imageTag ? 1 : -1),
      },
      render: (tag) => <CopyContent value={tag}>{tag}</CopyContent>,
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
        compare: (a, b) =>
          a.startedAtTimestamp > b.startedAtTimestamp ? 1 : -1,
      },
    },
  ],
  deployments: [
    {
      title: 'Replicas',
      key: 'replicas',
      dataIndex: 'replicas',
      order: 6,
      sorter: {
        compare: (a, b) => (a.replicas > b.replicas ? 1 : -1),
      },
    },
  ],
  horizontalpodautoscalers: [
    {
      title: 'Current CPU %',
      key: 'currentCPUUtilizationPercentage',
      dataIndex: 'currentCPUUtilizationPercentage',
      order: 7,
      sorter: {
        compare: (a, b) =>
          a.currentCPUUtilizationPercentage > b.currentCPUUtilizationPercentage
            ? 1
            : -1,
      },
      render: (value) => `${value}%`,
    },
    {
      title: 'Target CPU %',
      key: 'targetCPUUtilizationPercentage',
      dataIndex: 'targetCPUUtilizationPercentage',
      order: 8,
      sorter: {
        compare: (a, b) =>
          a.targetCPUUtilizationPercentage > b.targetCPUUtilizationPercentage
            ? 1
            : -1,
      },
      render: (value) => `${value}%`,
    },
    {
      title: 'Min. replicas',
      key: 'minReplicas',
      dataIndex: 'minReplicas',
      order: 9,
      sorter: {
        compare: (a, b) => (a.minReplicas > b.minReplicas ? 1 : -1),
      },
    },
    {
      title: 'Max. replicas',
      key: 'maxReplicas',
      dataIndex: 'maxReplicas',
      order: 10,
      sorter: {
        compare: (a, b) => (a.maxReplicas > b.maxReplicas ? 1 : -1),
      },
    },
    {
      title: 'Current replicas',
      key: 'currentReplicas',
      dataIndex: 'currentReplicas',
      order: 11,
      sorter: {
        compare: (a, b) => (a.currentReplicas > b.currentReplicas ? 1 : -1),
      },
    },
  ],
});

const namespaceColumns = [
  {
    title: 'Namespace',
    dataIndex: 'namespace',
    key: 'namespace',
    order: 99,
    sorter: {
      compare: (a, b) => (a.namespace > b.namespace ? 1 : -1),
    },
  },
];

const resourceTypesColumns = [
  {
    title: 'Kind',
    dataIndex: 'kind',
    key: 'kind',
    order: 98,
    sorter: {
      compare: (a, b) => (a.kind > b.kind ? 1 : -1),
    },
  },
];

export const getColumns = (
  resourceTypes,
  describeFunc,
  allStatuses,
  selectedNamespaces,
  selectedResourceTypes,
  deletePod
) => {
  const resourceColumns = getResourceColumns(allStatuses);
  const relevantResourceColumns = resourceTypes.reduce((result, type) => {
    return [...result, ...(resourceColumns[type] || [])];
  }, []);

  return [
    ...defaultColumns(describeFunc, allStatuses, deletePod),
    ...relevantResourceColumns,
    ...(selectedNamespaces.length > 1 ? namespaceColumns : []),
    ...(selectedResourceTypes.length > 1 ? resourceTypesColumns : []),
  ].sort((a, b) => a.order - b.order);
};
