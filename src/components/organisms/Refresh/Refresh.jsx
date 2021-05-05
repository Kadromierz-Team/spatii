import { Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { changeRefreshInterval } from '../../../actions';
import { Select, Button } from '../../molecules';

const options = [5, 10, 15, 20];

const Refresh = ({
  getResources,
  refreshing,
  changeRefreshInterval,
  toggleRefresh,
}) => {
  const { isEnabled, refreshInterval } = refreshing;
  const [intervalId, setIntervalId] = useState(null);
  const formattedOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  useEffect(() => {
    clearInterval(intervalId);
    if (isEnabled) {
      const id = setInterval(() => {
        console.log('GET RESOURCES!!!');
        getResources(false);
      }, refreshInterval * 1000);

      setIntervalId(id);
    }

    return clearInterval(intervalId);
  }, [isEnabled, refreshInterval]);

  return (
    <div className="refresh">
      <Button text="Refresh" onClick={getResources} />
      <Checkbox checked={isEnabled} onChange={() => toggleRefresh(!isEnabled)}>
        Autorefresh
      </Checkbox>
      <Select
        value={refreshInterval}
        onChange={(newInterval) => changeRefreshInterval(newInterval)}
        options={formattedOptions}
        allowClear={false}
      />
      seconds
    </div>
  );
};

export default Refresh;
