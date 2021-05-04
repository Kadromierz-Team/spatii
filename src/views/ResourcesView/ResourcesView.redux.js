import { connect } from 'react-redux';
import ResourcesView from './ResourcesView';

const mapStateToProps = (state) => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ResourcesView);
