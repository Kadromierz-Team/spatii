import React from 'react';
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

const ResourcesView = ({ filters }) => {
  return (
    <div>
      <PageHeader title={'Spatii'} />
      <Filters {...filters} />
      <Table columns={getColumns('pod')} data={data} />
    </div>
  );
};

ResourcesView.propTypes = {
  filters: PropTypes.shape({
    selectedContext: PropTypes.shape({}),
    contexts: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default ResourcesView;
