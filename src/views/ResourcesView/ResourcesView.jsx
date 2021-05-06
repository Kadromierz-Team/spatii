import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag, Row, Input, Col, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Filters, DescriptionModal, SettingsModal, Refresh } from '../../components/organisms';
import { Table, Button } from '../../components/molecules';
import { getColumns } from './utils';

const ResourcesView = ({
  filters,
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  resources,
  getResourceDescription,
  clearResourceDescription,
  changeSelectedResources,
  applyKubectlPathFromStore,
  setStore,
  changeSearchText,
  selectedResources,
  refreshing,
  changeRefreshInterval,
  getResources,
  toggleRefresh,
  startLogs,
  deletePod,
  showLoader,
}) => {
  const formattedResources = resources
    .filter(
      (resource) =>
        resource && resource.name && resource.name.includes(filters.searchText)
    )
    .map((resource) => {
      const splitImage = resource.image?.split(':');

      return {
        ...resource,
        imageTag: splitImage ? splitImage[splitImage.length - 1] : undefined,
        options: resource.name,
        key: resource.name,
        replicas: `${resource.readyReplicas || 0}/${
          resource.availableReplicas || 0
        }`,
        minReplicas: resource.minReplicas,
        maxReplicas: resource.maxReplicas,
        currentReplicas: resource.currentReplicas,
        targetCPUUtilizationPercentage: resource.targetCPUUtilizationPercentage,
        currentCPUUtilizationPercentage:
          resource.currentCPUUtilizationPercentage,
      };
    });
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);  
  const [resourceName, setResourceName] = useState(null);

  const showDescriptionModal = (value) => {
    setResourceName(value);
    getResourceDescription(value);
    setIsDescriptionModalVisible(true);
  };

  const showSettingsModal = () => {
    setIsSettingsModalVisible(true);
  };

  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalVisible(false);
    clearResourceDescription();
    setResourceName(null);
  };

  const handleSaveSettingsModal = (items) => {
    setStore(items);
    applyKubectlPathFromStore();
    setIsSettingsModalVisible(false);
  }

  const handleCloseSettingsModal = () => {
    setIsSettingsModalVisible(false);
  }

  const onSearch = (event) => changeSearchText(event.target.value);

  const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      const keys = selectedRows.reduce(
        (result, row) => ({
          ...result,
          [`${row.namespace}_${row.name}`]: {
            namespace: row.namespace,
            name: row.name,
            kind: row.kind,
          },
        }),
        {}
      );
      changeSelectedResources(keys);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
      checked: Boolean(selectedResources[`${record.namespace}_${record.name}`]),
    }),
  };

  const allStatuses = Array.from(
    new Set(formattedResources.map((resource) => resource.status))
  ).map((status) => ({
    text: status,
    value: status,
  }));

  return (
    <div className="resource-view-wrapper">
      <PageHeader title={'Spatii'} />
      <Row className="filters">
        <Col flex="40px">
          <Button icon={<SettingOutlined />} onClick={showSettingsModal} />
        </Col>
        <Col flex="auto" />
        <Col flex="500px">
          <Space direction="horizontal">
            <Refresh
              changeRefreshInterval={changeRefreshInterval}
              getResources={getResources}
              refreshing={refreshing}
              toggleRefresh={toggleRefresh}
            />
            <Input.Search
              allowClear
              placeholder="filter resources"
              onChange={onSearch}
            />
          </Space>
        </Col>
      </Row>
      <Filters
        {...filters}
        changeContext={changeContext}
        changeNamespaces={changeNamespaces}
        changeResourceTypes={changeResourceTypes}
        startLogs={startLogs}
      />
      <Table
        columns={getColumns(
          filters.selectedResourceTypes,
          showDescriptionModal,
          allStatuses,
          filters.selectedNamespaces,
          filters.selectedResourceTypes,
          deletePod
        )}
        data={formattedResources}
        rowSelection={rowSelection}
        loading={showLoader}
      />
      <DescriptionModal
        visible={isDescriptionModalVisible}
        handleOk={handleCloseDescriptionModal}
        handleCancel={handleCloseDescriptionModal}
        title={resourceName}
        jsonObject={filters.resourceDescription}
        compactObject={filters.compactDescription}
      />
      <SettingsModal 
        visible={isSettingsModalVisible}
        handleCancel={handleCloseSettingsModal}
        handleOk={handleSaveSettingsModal} />
    </div>
  );
};

ResourcesView.propTypes = {
  filters: PropTypes.shape({
    selectedContext: PropTypes.string,
    contexts: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  getInitData: PropTypes.func,
  changeNamespaces: PropTypes.func,
  changeContext: PropTypes.func,
};

export default ResourcesView;
