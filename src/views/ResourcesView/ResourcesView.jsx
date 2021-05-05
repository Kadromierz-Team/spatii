import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag } from 'antd';
import { Filters, ModalJsonView } from '../../components/organisms';
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
  startLogs
}) => {
  const formattedResources = resources
    .filter((resource) => resource.name && resource.status)
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
    }),
  };

  return (
    <div className="resource-view-wrapper">
      <PageHeader title={'Spatii'} />
      <Filters
        {...filters}
        changeContext={changeContext}
        changeNamespaces={changeNamespaces}
        changeResourceTypes={changeResourceTypes}
        startLogs={startLogs}
      />
      <Table
        columns={getColumns('pod', showModal)}
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
