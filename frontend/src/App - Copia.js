import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';


// Frontend
import io from 'socket.io-client';


		// Cria uma instância do "socket.io-client" e conecta-se ao servidor Socket.IO
//var socket = io('http://172.17.0.2:5000');
var socket = io('http://127.0.0.1:5000', {
	autoConnect: false,
//var socket = io('ws://0.0.0.0:5000', {
//var socket = io('http://192.168.0.101:5000', {	
//var socket = io('localhost:5001', {	
	withCredentials: true,
	//transports: ['websocket'],
  auth: {
      token: 'myAuthToken',
      //'X-Username': "b",
	 //'X-Password': "b"	  
  },
  /*extraHeaders: {
      'X-Username': 'c',
	 'X-Password': 'c'	  
  },*/
  query:
  {
	 'X-Username': 'd',
	 'X-Password': 'd'

  },
  /*api:
  {
	 'X-Username': 'e',
	 'X-Password': 'e'

  },*/
  
});

/*function MyComponent() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    // Se inscreve no evento "data" quando o componente é montado
    socket.on('data', (data) => {
      setDataList((prevDataList) => [...prevDataList, data]);
    });

    // Remove a inscrição no evento "data" quando o componente é desmontado
    return () => {
      socket.off('data');
    };
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
}*/




/*function Counter2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
    </div>
  );
};*/


function App() 
{

//var socket = io('http://127.0.0.1:5000');

//const socket = io.connect("https://0.0.0.0:5001", { secure: true, reconnection: true, rejectUnauthorized: false });



/*function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
    </div>
  );
}*/


   const [dataList, setDataList] = useState([]);
   const [message, setMessage] = useState('');


	  useEffect(() => {
		// Se inscreve no evento "data" quando o componente é montado
		socket.on('data', (data) => {
		  setDataList((prevDataList) => [...prevDataList, data]);
		});

		// Remove a inscrição no evento "data" quando o componente é desmontado
		return () => {
		  socket.off('data');
		};
	  }, []);
	  
   //const HandleGetList = (e) => 
   //function HandleGetList()
   const MyCustomHook = () => {
	  //const [value, setValue] = React.useState(0);
      //return <div>{value}</div>;
	  //const [dataList, setDataList] = useState([]);
	  //console.log( data )

return (
    <div>
      <h1>Últimos Dados Recebidos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
   }
   
   const handleConnect = (e) => 
   {
     e.preventDefault();
     console.log('The link was clicked.');


	// Verifica se o cliente foi autenticado com sucesso usando o evento "connect" do "socket.io-client"
	socket.on('connect', () => {
	  console.log('Connected to server');
	  //alert( 'ok');
	});

	// Desconecta o cliente se ele não for autenticado com sucesso
	socket.on('unauthorized', () => {
	console.log('unuccessfully authenticated');
	});

	socket.on('error', (err)=>
	{ 
	  //console.log(err instanceof Error);
	  //console.log(err.message);
	} );

	socket.on('connect_error', (err)=>
	{ 
	  //console.log(err instanceof Error);
	  console.log(err.message);
	  //console.log(err.data);
	} );


	//socket.on('error', console.log("error") );
	socket.on('message', (message)=>{console.log( message );});

	socket.on('unauthorized', (error) => {
	console.error('Authentication error:', error);
	socket.disconnect();
	});

	 //alert( 'a' );
	 try
	 {
	   //socket.emit('message', message);
       //socket.once("connect", () => {
        //socket.emit("authenticate", {
          //username,
         // password,
        //});
      //});
	    
		socket.connect();
		//socket.emit('authentication', { 'X-Username': 'a', 'X-Password': 'a' } );

	 }catch(e)
	 {
       //socket.emit('error', e.message);
       return;
     }
   }
	const [count, setCount] = useState(0);
	
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > 
          Learn React
        </a>
		<button className="favorite styled" type="button"> Add to favorites</button>
		<input type="text" value={message} onChange={e => setMessage(e.target.value)} />
		<button type="button" onClick={handleConnect}>Connect</button>
		<button type="button" onClick={MyCustomHook}>GetList</button>
		<button onClick={() => setCount(count + 1)}>Click me</button>
		<div>{count}</div>;
      </header>
    </div>
  );
}

export default App;
