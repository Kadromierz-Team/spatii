import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag, Space, Input } from 'antd';
import { Filters, ModalJsonView, Refresh } from '../../components/organisms';
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
      };
    });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resourceName, setResourceName] = useState(null);
  const showModal = (value) => {
    setResourceName(value);
    getResourceDescription(value);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    clearResourceDescription();
    setResourceName(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    clearResourceDescription();
    setResourceName(null);
  };

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
            kind: row.kind
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
      <Filters
        {...filters}
        changeContext={changeContext}
        changeNamespaces={changeNamespaces}
        changeResourceTypes={changeResourceTypes}
        startLogs={startLogs}
      />
      <Table
        columns={getColumns(
          filters.selectedResourceTypes.includes('pods') ? 'pods' : '',
          showModal,
          allStatuses,
          filters.selectedNamespaces,
          filters.selectedResourceTypes,
          deletePod
        )}
        data={formattedResources}
        rowSelection={rowSelection}
        loading={showLoader}
      />
      <ModalJsonView
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={resourceName}
        jsonObject={filters.resourceDescription}
      />
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
