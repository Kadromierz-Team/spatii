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
  toggleRefresh,
  changeRefreshInterval,
  getResources,
  deletePod,
  changeSearchText,
} from '../../actions';

import { startLogs } from '../../actions/logs';

const mapStateToProps = (state) => ({
  filters: state.filters,
  resources: state.resources,
  selectedResources: state.selectedResources,
  refreshing: state.refreshing,
  showLoader: state.showLoader,
});

const mapDispatchToProps = {
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  getResourceDescription,
  clearResourceDescription,
  changeSelectedResources,
  toggleRefresh,
  changeSearchText,
  changeRefreshInterval,
  getResources,
  startLogs,
  deletePod,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
