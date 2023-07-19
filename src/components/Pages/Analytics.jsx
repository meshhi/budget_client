import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Button from '../UI/Button';
import ReactECharts from 'echarts-for-react';

const Analytics = ({url}) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const query = {
      query: {
        "measures": [
          "transactions.count"
        ],
        "timeDimensions": [
          {
            "dimension": "transactions.created_at"
          }
        ],
        "order": {
          "transactions.count": "desc"
        },
        "dimensions": [
          "categories.title"
        ]
      }
    };

    const response = await fetch(`${url}:4000/cubejs-api/v1/load`, {
      method: "post",
      headers: {
        // Authorization: `JWT ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });
    const dataResponse = await response.json();
    const results = dataResponse.data;
    setData(results);
  };

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

  const pieOption = {
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'pie',
        data: data.map(item => ({
          name: item["categories.title"],
          value: item["transactions.count"],
        })),
        radius: '50%'
      }
    ]
  }

  useEffect(() => {
    sendMessage({
      event: 'message',
      payload: 'some '
    });
    getData();
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
        option={pieOption}
      />
    </div>
  )
}

export default Analytics;