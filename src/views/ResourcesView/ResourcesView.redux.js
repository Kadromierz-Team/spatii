import { connect } from 'react-redux';
import ResourcesView from './ResourcesView';
import {
  getInitData,
  changeContext,
  changeNamespaces,
  changeResourceTypes,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
