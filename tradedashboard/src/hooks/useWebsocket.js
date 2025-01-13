import { useState, useEffect, useRef } from "react";


const useWebSocket = (url = process.env.REACT_APP_WEBSOCKET_URL) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const inactivityTimerRef = useRef(null);

  const initializeWebSocket = () => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      console.log("Data From The Server", event.data);
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed.");
      
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);
  };

  const closeWebSocket = () => {
    if (ws) {
      ws.close();
    }
  };

  const handleUserActivity = () => {
    if (ws) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        closeWebSocket();
      }, 300000); 
    }
  };

  const handleBeforeUnload = () => {
    closeWebSocket();
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearTimeout(inactivityTimerRef.current);
    };
  }, [ws]);

  const sendMessage = (message) => {
    console.log(message)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };


  return {
    ws,
    messages,
    sendMessage,
    initializeWebSocket,
  };
};

export default useWebSocket;
