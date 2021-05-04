import React from 'react';
import { PageHeader, Select } from 'antd';

const { Option } = Select;

 const ResourcesView = () => {
  return (
    <div>
    <PageHeader title={"Spatii"} extra={[
      <Select  defaultValue="production" style={{ width: 120 }}>
        <Option value="production">production</Option>
        <Option value="frontend">frontend</Option>
      </Select>
    ]}/>
    </div>
  );
};


export default ResourcesView;
