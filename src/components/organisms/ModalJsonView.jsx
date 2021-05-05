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
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {jsonObject === null ? <Skeleton /> : <ReactJson src={jsonObject} />}
    </AntModal>
  );
};

ModalJsonView.propTypes = {
  isModalVisible: PropTypes.bool,
};

export default ModalJsonView;
