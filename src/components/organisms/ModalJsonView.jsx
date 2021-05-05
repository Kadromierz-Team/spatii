import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { Modal as AntModal, Skeleton } from 'antd';

const ModalJsonView = ({
  visible,
  showEmptyState,
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
        <ReactJson
          theme="shapeshifter"
          collapsed="1"
          style={{ width: 'auto' }}
          src={jsonObject}
        />
      )}
    </AntModal>
  );
};

ModalJsonView.propTypes = {
  isModalVisible: PropTypes.bool,
};

export default ModalJsonView;
