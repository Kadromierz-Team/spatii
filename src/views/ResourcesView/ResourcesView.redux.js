import { connect } from 'react-redux';
import ResourcesView from './ResourcesView';
import { getInitData, changeContext } from '../../actions';

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = {
  getInitData,
  changeContext,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
