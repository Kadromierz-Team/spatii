import React from 'react';
import PropTypes from 'prop-types';

class LogBox extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
     if(this.messagesEndRef) this.messagesEndRef.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const {logs} = this.props;
    return (
          <div className="logsBox">
            {logs.map((log,i)=>
              <>
                <span className="logsSourceLabel" key={`SL${i}`}>{log.item}</span>
                <p key={i}>{log.value}</p>
              </>)}
            <div key={'lastEl'} ref={ref=>this.messagesEndRef=ref} />
          </div>
    );
  }
}


LogBox.propTypes={
  logs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    item: PropTypes.string,
  }))
}




export default LogBox;
