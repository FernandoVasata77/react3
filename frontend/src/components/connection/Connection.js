// Fernando Vasata
import React, { useState, useEffect } from 'react';


// Frontend
import io from 'socket.io-client';


var  socket;

function Connection()  
{

  const [dataList, setDataList] = useState([]);
  const [socketInstance, setSocketInstance] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [commandResult, setCommandResult] = useState(null);


        useEffect(() => {
		
      const UserName = document.getElementById('username');		
	  const Password = document.getElementById('password');		
	  
      socket = io.connect( 'http://127.0.0.1:5000/api', 
		{
			transports: ['polling'],
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
			},
			auth: 
			{
				token: 'api',
			},			
			autoConnect: false,
			extraHeaders: 
			{
		     	'X-Username': UserName,
				'X-Password': Password
			}
		
		});


		 
		 
	// Verifica se o cliente foi autenticado com sucesso usando o evento "connect" do "socket.io-client"
	socket.on('connect', () => {
	  console.log('On Connect. Connected to server');
  
	  //socket.emit('message', message);
	  //alert( 'ok');
	});


	// Se inscreve no evento "credentials" após a conexão ser validada
    socket.on('credentials', (data) => 
	{
		console.log('Credentials received');
		setCredentials(data);
	});
	
	socket.on('disconnect', () => 
	{
	  console.log('On disconnect!');
	  //socket.emit('message', message);
	  //alert( 'ok');
	});
	
	

	// Desconecta o cliente se ele não for autenticado com sucesso
	socket.on('unauthorized', () => 
	{
	  console.log('unuccessfully authenticated');
	});

	socket.on('error', (err)=>
	{ 
	  //console.log(err instanceof Error);
	  console.log(err.message);
	} );

	socket.on('connect_error', (err)=>
	{ 
	  //console.log(err instanceof Error);
	  console.log(err.message);
	  //console.log(err.data);
	} );


	//socket.on('error', console.log("error") );
	socket.on('message', (message)=>{console.log( message );});

	socket.on('unauthorized', (error) => 
	{
	  console.error('Authentication error:', error);
	  //socket.disconnect();
	});

	socket.on('status', (st) => 
	{
	  console.log('Status');
	});


	socket.on('authenticated', function () 
	{
      console.error('Authenticated');
    });
    

   socket.on('data', (data) => 
	{
	  setDataList(dataList => []);
      setDataList((prevDataList) => [...prevDataList, data]);
	  console.log('On data!');
	  //socket.disconnect();
	});
   
    }, []);


		
   const [message, setMessage] = useState('');
    
   //const handleConnect = (e) => 
   function HandleDisconnect (e)
   {
	  console.log('Disconnecting...');
	  socket.disconnect();
   }


   function HandleGetData (e)
   {
	  console.log('GetData...');
	  socket.emit( "data" );
   }

   function HandleClearData (e)
   {
	  console.log('ClearData...');
	  const token = credentials.access_token;
  
      const config = 
      {
        "token": credentials.access_token
      }
	  
	  socket.emit('clear', config  );
	  
	  setDataList(dataList => []);
  
	  const Out = document.getElementById('DataArea');
      Out.value = "";
	  
	  
   }

   function GetData (e)
   {
	  console.log('GetData...');
	  const Out = document.getElementById('DataArea');
      Out.value = "";

	  if( dataList )
	  {
		  console.log( dataList );
		  var Index = 0;
		  for( Index = 0; Index < dataList[0].length; Index++ )
		  {
			var Obj = dataList[0][Index];
			Out.value += Obj.type + " " + Obj.param1 + " " + Obj.param2 + " " + Obj.timestamp + "\n"; 
		  }
	  }
   }
   
   //const handleConnect = (e) => 
   function HandleConnect (e)
   {
     //setSocketInstance(socket);

     e.preventDefault();
     console.log('The link was clicked.');



	 //alert( 'a' );
	 try
	 {
		//socket.addNamespace('api')
		socket.connect();
	 }
	 catch(e)
	 {
       return;
     }
   }
	//const [count, setCount] = useState(0);
	
  return (
     <div>
	    <br></br>
		<button type="button" onClick={HandleConnect}>Connect</button>
		<button type="button" onClick={HandleDisconnect}>Disconnect</button>
		<button type="button" onClick={GetData}>GetData</button>
        <button type="button" onClick={HandleClearData}>ClearData</button>
		<br></br>
		<br></br>
		<textarea id="DataArea" rows="10" cols="1"></textarea>
    </div>
  );
}
export default Connection;

 
 