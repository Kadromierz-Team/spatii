import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectOption, Button } from '../../molecules';

import './Filters.scss';
import { useHistory } from 'react-router-dom';

const Filters = ({
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  contexts,
  selectedContext,
  namespaces,
  selectedNamespaces,
  resourceTypes,
  selectedResourceTypes,
  startLogs,
}) => {
  console.log({
    changeContext,
    changeResourceTypes,
    contexts,
    namespaces,
    selectedContext,
  });
  const contextOptions = contexts.map((context) => ({
    value: context,
    label: context,
  }));
  const namespacesOptions = namespaces
    .sort((a, b) => {
      if (a === 'staging' || a === 'production') {
        return -1;
      }

      if (b === 'staging' || b === 'production') {
        return 1;
      }

      return a < b ? -1 : 1;
    })
    .map((namespace) => ({
      value: namespace,
      label: namespace,
    }));
  const resourceTypesOptions = resourceTypes
    .sort((a, b) => {
      if (a === 'pods' || a === 'deployments') {
        return -1;
      }

      if (b === 'pods' || b === 'deployments') {
        return 1;
      }

      return a < b ? -1 : 1;
    })
    .map((resourceType) => ({
      value: resourceType,
      label: resourceType,
    }));
  let history = useHistory();
  console.log({ selectedResourceTypes });

  return (
    <div className="filters">
      <Select
        placeholder="Select context"
        value={selectedContext}
        onChange={(newContext) => changeContext(newContext)}
        options={contextOptions}
        allowCLear={false}
      />

      <Select
        placeholder="Select namespaces"
        value={selectedNamespaces}
        mode="multiple"
        options={namespacesOptions}
        onChange={(namespaces) => {
          changeNamespaces(namespaces);
        }}
      />
      <Select
        placeholder="Select resource types"
        value={selectedResourceTypes}
        mode="multiple"
        options={resourceTypesOptions}
        onChange={(resourceTypes) => {
          console.log('CHANGE', { resourceTypes });
          changeResourceTypes(resourceTypes);
        }}
      />

      <Button
        text="Logs"
        type="primary"
        onClick={() => {
          startLogs();
          history.push('/logs');
        }}
      />
    </div>
  );
};

Filters.propTypes = {
  contexts: PropTypes.arrayOf(PropTypes.shape({})),
  changeContext: PropTypes.func,
  changeNamespaces: PropTypes.func,
  changeResourceTypes: PropTypes.func,
  selectedContext: PropTypes.string,
};

export default Filters;
