import { connect } from 'react-redux';
import LogsView from './LogsView';
import { pauseLogs, clearLogs, resumeLogs, resetLogs } from '../../actions/logs';

const mapStateToProps = (state) => ({
  currentLogs: state.currentLogs,
});

const mapDispatchToProps = {
  pauseLogs,
  clearLogs,
  resumeLogs,
  resetLogs
};

export default connect(mapStateToProps,mapDispatchToProps)(LogsView);
