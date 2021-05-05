import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { Modal as AntModal, Skeleton, Space } from 'antd';

const ModalJsonView = ({
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
        <Space direction="vertical">
          <ReactJson
            theme="shapeshifter"
            style={{ width: 'auto' }}
            src={compactObject}
          />
          <ReactJson
            theme="shapeshifter"
            collapsed="1"
            style={{ width: 'auto' }}
            src={jsonObject}
          />{' '}
        </Space>
      )}
    </AntModal>
  );
};

ModalJsonView.propTypes = {
  isModalVisible: PropTypes.bool,
};

export default ModalJsonView;
