import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Connection from "../connection/Connection"

const GetData = (props) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    // Se inscreve no evento "data" quando o componente é montado
    //Connection.socket.on('data', (data) => {
      //setDataList((prevDataList) => [...prevDataList, data]);
    //});

    // Remove a inscrição no evento "data" quando o componente é desmontado
    //return () => {
      //Connection.socket.off('data');
    //};
  }, []);

  return (
    <div>
      <ul>
        {dataList.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
}
export default GetData