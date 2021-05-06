import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { Modal as AntModal, Skeleton, Space, Tabs } from 'antd';

const { TabPane } = Tabs;

const DescriptionModal = ({
  visible,
  showEmptyState,
  compactObject,
  jsonObject,
  handleOk,
  handleCancel,
  title,
}) => {
  return (
    <AntModal
      width="80%"
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {jsonObject === null ? (
        <Skeleton />
      ) : (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Compact description" key="1">
            <ReactJson
              theme="shapeshifter"
              style={{ width: 'auto' }}
              src={compactObject}
            />
          </TabPane>
          <TabPane tab="Full description" key="2">
            <ReactJson
              theme="shapeshifter"
              collapsed="1"
              style={{ width: 'auto' }}
              src={jsonObject}
            />
          </TabPane>
        </Tabs>
      )}
    </AntModal>
  );
};

DescriptionModal.propTypes = {
  isModalVisible: PropTypes.bool,
};

export default DescriptionModal;
