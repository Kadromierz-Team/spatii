import React from 'react';
import { PageHeader, Select } from 'antd';

const { Option } = Select;

const ResourcesView = () => {
  return (
    <div>
      <PageHeader
        title="Spatii"
        extra={[
          <Select key="namespaceFilter" value="frontend" style={{ width: 124 }}>
            <Option value="production" key="production">
              production
            </Option>
            <Option value="frontend" key="frontend">
              frontend
            </Option>
          </Select>,
        ]}
      />
    </div>
  );
};

export default ResourcesView;
