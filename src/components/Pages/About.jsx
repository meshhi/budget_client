import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Button from '../UI/Button'

const About = () => {
  // const [socketUrl, setSocketUrl] = useState('wss://api-pub.bitfinex.com/ws/2');
  const [socketUrl, setSocketUrl] = useState('wss://ws.bitstamp.net');

  // const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  // ws.onopen = (event) => {
  //   console.log('ws connec')
  //   ws.send(JSON.stringify(apiCall));
  // };

  // ws.onmessage = function (event) {
  //   console.log(event)
  //   const json = JSON.parse(event.data);
  //   try {
  //     if ((json.event = "data")) {

  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const [messageHistory, setMessageHistory] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Init ws state');

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
      // debugger
      const data = JSON.parse(event.data);
      // const message = JSON.parse(data.data)
      console.log('message received')
      console.log(data.data)
      if (data.data.bids) {
        setMessageHistory(data.data.bids)
      }
  },
  });

  useEffect(() => {
  }, []);

  return(
    <div className="currency__container">
      {
        messageHistory.map(item => {
          return(
            <div>${item[0]}</div>
          )
        })
      }
      <Button callback={() => {
        const payload = {
          "event":"ping",
          "cid": 1234
        }
        sendMessage(JSON.stringify(apiCall));
        // ws.send(1);
      }}></Button>

    </div>
  )
}

export default About;