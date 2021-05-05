import { connect } from 'react-redux';
import ResourcesView from './ResourcesView';
import {
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  getResourceDescription,
  clearResourceDescription,
  changeSelectedResources,
} from '../../actions';

import {startLogs} from '../../actions/logs';

const mapStateToProps = (state) => ({
  filters: state.filters,
  resources: state.resources,
  selectedResources: state.selectedResources,
});

const mapDispatchToProps = {
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  getResourceDescription,
  clearResourceDescription,
  changeSelectedResources,
  startLogs
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
