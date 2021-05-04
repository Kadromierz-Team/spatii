import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Checkbox, Tag } from 'antd';
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
  },
  {
    key: '2',
    name: 'POD2',
    isSelected: true,
    status: 'NOT OK',
  },
  {
    key: '2',
    name: 'POD2',
    isSelected: true,
    status: 'NO INFO',
  },
];

const ResourcesView = ({
  filters,
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
}) => {
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
      <Table columns={getColumns('pod')} data={data} />
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
