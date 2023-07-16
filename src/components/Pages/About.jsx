import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Button from '../UI/Button'

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
      console.log('message received')
      console.log(event.data)
      setMessageHistory(event.data)
    },
  });

  useEffect(() => {
    sendMessage({
      event: 'message',
      payload: 'some '
    })
  }, []);

  return(
    <div className="currency__container">
      {
        messageHistory
      }
      <Button callback={() => {

        sendMessage(1);
      }}></Button>

    </div>
  )
}

export default About;