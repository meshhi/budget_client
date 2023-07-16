import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Button from '../UI/Button';
import ReactECharts from 'echarts-for-react';

const About = () => {
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000');
  const [messageHistory, setMessageHistory] = useState();
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log(`ws to ${socketUrl} opened`);
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => {
      setMessageHistory(event.data)
    },
  });

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  useEffect(() => {
    sendMessage({
      event: 'message',
      payload: 'some '
    })
  }, []);

  return(
    

    <div className="card analytics">
      <header className="card__header">Аналитика</header>
      <div className="currency__container">
        {
          Date(messageHistory)
        }
      </div>
      <ReactECharts
        option={options}
      />
    </div>
  )
}

export default About;