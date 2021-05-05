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

const mapStateToProps = (state) => ({
  filters: state.filters,
  resources: state.resources,
});

const mapDispatchToProps = {
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
  getResourceDescription,
  clearResourceDescription,
  changeSelectedResources,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
