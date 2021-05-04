import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectOption, Button } from '../molecules';

import './Filters.scss';

const namespaces = [
  {
    key: 'def',
  },
];

const resourceTypes = [
  {
    key: 'ghi',
  },
];

const Filters = ({
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  contexts,
  selectedContext,
}) => {
  const contextOptions = contexts.map((context) => ({
    value: context,
    label: context,
  }));

  console.log({
    changeContext,
    changeResourceTypes,
    contexts,
    selectedContext,
  });

  return (
    <div className="filters">
      <Select
        placeholder="Select context"
        value={selectedContext}
        onChange={(newContext) => changeContext(newContext)}
        options={contextOptions}
      />

      <Select
        placeholder="Select namespaces"
        value={[namespaces[0].key]}
        mode="multiple"
      >
        {namespaces.map((namespace) => (
          <Select.Option
            value={namespace.key}
            label={namespace.key}
            key={namespace.key}
          >
            {namespace.key}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Select resource types"
        value={[resourceTypes[0].key]}
        mode="multiple"
      >
        {resourceTypes.map((resourceType) => (
          <Select.Option
            value={resourceType.key}
            label={resourceType.key}
            key={resourceType.key}
          >
            {resourceType.key}
          </Select.Option>
        ))}
      </Select>
      <Button text="Logs" type="primary" onClick={() => {}} />
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
