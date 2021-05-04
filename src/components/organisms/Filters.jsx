import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectOption, Button } from '../molecules';

import './Filters.scss';

const contexts = [
  {
    key: 'abc',
    label: 'abc',
    value: 'abc',
  },
];

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

const Filters = ({ changeContext, changeNamespaces, changeResourceTypes }) => (
  <div className="filters">
    <Select placeholder="Select context" value={contexts[0].key}>
      {contexts.map((context) => (
        <Select.Option
          value={context.key}
          label={context.key}
          key={context.key}
        >
          {context.key}
        </Select.Option>
      ))}
    </Select>
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
    <Button text="Logi" type="primary" onClick={() => {}} />
  </div>
);

Filters.propTypes = {
  contexts: PropTypes.arrayOf(PropTypes.shape({})),
  changeContext: PropTypes.func,
  changeNamespaces: PropTypes.func,
  changeResourceTypes: PropTypes.func,
};

export default Filters;
