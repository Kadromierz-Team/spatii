import React from 'react';
import { PageHeader } from 'antd';
import {Filters} from '../../components/molecules';

const ResourcesView = () => {
  return (
    <div>
      <PageHeader
        title={'Spatii'}
      />
      <Filters />
    </div>
  );
};

export default ResourcesView;
