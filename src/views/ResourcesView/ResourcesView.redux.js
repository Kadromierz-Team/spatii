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
} from '../../actions';

const mapStateToProps = (state) => ({
  filters: state.filters,
  resources: state.resources,
  selectedResources: state.selectedResources,
  refreshing: state.refreshing,
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
  changeRefreshInterval,
  getResources,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
