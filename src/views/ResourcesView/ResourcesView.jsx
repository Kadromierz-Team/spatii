import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag, Modal } from 'antd';
import { Filters } from '../../components/organisms';
import { Table, Button } from '../../components/molecules';
import { getColumns } from './utils';

const data = [
  {
    key: '1',
    name: 'POD1',
    isSelected: false,
    imageTag: '00000000',
    status: 'OK',
    options: 'POD1',
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
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resourceName, setResourceName] = useState(null);
  const showModal = (value) => {
    setIsModalVisible(true);
    setResourceName(value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setResourceName(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{resourceName}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
