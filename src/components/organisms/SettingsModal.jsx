import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { Input, Modal as AntModal, Skeleton, Space, Tabs } from 'antd';

const { TabPane } = Tabs;

const SettingsModal = ({
  visible,
  handleOk,
  handleCancel,
  title,
}) => {
  const [ kubectlPath, setKubectlPath ] = useState('');

  return (
    <AntModal
      width="80%"
      title={title}
      visible={visible}
      onOk={() => handleOk({ kubectlPath })}
      onCancel={handleCancel}
    >
      <Input placeholder="Kubectl path" allowClear onChange={(event) => setKubectlPath(event.target.value)} />
    </AntModal>
  );
};

SettingsModal.propTypes = {
  isModalVisible: PropTypes.bool,
};

export default SettingsModal;
