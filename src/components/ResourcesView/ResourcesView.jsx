import React from 'react';
import { PageHeader, Select } from 'antd';
import './ResourceView.scss';
import { Filters } from '../molecules';

const { Option } = Select;

const ResourcesView = () => {
  return (
    <div>
      <PageHeader title="Spatii" />
      <Filters />
    </div>
  );
};

export default ResourcesView;
