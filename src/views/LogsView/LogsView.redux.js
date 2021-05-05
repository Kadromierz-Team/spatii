import { connect } from 'react-redux';
import LogsView from './LogsView';

const mapStateToProps = (state) => ({
  currentLogs: state.currentLogs,
});

export default connect(mapStateToProps)(LogsView);
