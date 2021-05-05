import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag } from 'antd';
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
  selectedResources,
  refreshing,
  changeRefreshInterval,
  getResources,
  toggleRefresh,
}) => {
  const formattedResources = resources
    .filter((resource) => resource && resource.name)
    .map((resource) => {
      const splitImage = resource.image?.split(':');

      return {
        ...resource,
        imageTag: splitImage ? splitImage[splitImage.length - 1] : undefined,
        options: resource.name,
        isSelected: resource.name,
        key: resource.name,
      };
    });
  console.log({ resources, formattedResources });
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

  const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      changeSelectedResources(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
      checked: selectedResources.includes(record.name),
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
      <Refresh
        changeRefreshInterval={changeRefreshInterval}
        getResources={getResources}
        refreshing={refreshing}
        toggleRefresh={toggleRefresh}
      />
      <Filters
        {...filters}
        changeContext={changeContext}
        changeNamespaces={changeNamespaces}
        changeResourceTypes={changeResourceTypes}
      />
      <Table
        columns={getColumns(
          filters.selectedResourceTypes.includes('pods') ? 'pods' : '',
          showModal,
          allStatuses
        )}
        data={formattedResources}
        rowSelection={rowSelection}
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
