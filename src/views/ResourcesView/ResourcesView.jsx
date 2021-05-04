import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag } from 'antd';
import { Filters, ModalJsonView } from '../../components/organisms';
import { Table, Button } from '../../components/molecules';
import { getColumns } from './utils';

const data = [
  {
    key: '1',
    name: 'staging-core-drone-555f578766-89xvd',
    isSelected: false,
    imageTag: '00000000',
    status: 'OK',
    options: 'staging-core-drone-555f578766-89xvd',
  },
  {
    key: '2',
    name: 'POD2',
    isSelected: true,
    status: 'NOT OK',
    options: 'POD2',
  },
  {
    key: '2',
    name: 'POD2',
    isSelected: true,
    status: 'NO INFO',
    options: 'POD3',
  },
];

const ResourcesView = ({
  filters,
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  getResourceDescription,
  clearResourceDescription,
}) => {
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

  console.log(filters);
  return (
    <div className="resource-view-wrapper">
      <PageHeader title={'Spatii'} />
      <Filters
        {...filters}
        changeContext={changeContext}
        changeNamespaces={changeNamespaces}
        changeResourceTypes={changeResourceTypes}
      />
      <Table columns={getColumns('pod', showModal)} data={data} />
      <ModalJsonView
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={resourceName}
        jsonObject={filters.resourceDescription}
      />
      <div></div>
    </div>
  );
};

ResourcesView.propTypes = {
  filters: PropTypes.shape({
    selectedContext: PropTypes.shape({}),
    contexts: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  getInitData: PropTypes.func,
  changeNamespaces: PropTypes.func,
  changeContext: PropTypes.func,
};

export default ResourcesView;
