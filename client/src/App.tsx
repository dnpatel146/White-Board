
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Forms from './components/Forms'
import RoomPage from './pages/Roompage';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';


const server ="http://localhost:5000/";
const connectionOptions = {
  "force new connnection": true,
  reconnnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
}; 


const socket = io(server, connectionOptions);

const App = () => {

  const [user,setUser]= useState([]);
  

  const uuid = () => {
    let s4 = () => {
      return (((1+ Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  const [users,setUsers] = useState([]);

  useEffect(() => {
    socket.on("userIsJoined",(data) => {
      if(data.success){
        console.log("user joined");
        setUsers(data);
      }else{
        console.log("something went wrong")
      }
      
    });

    // socket.on("presenter", (data)=>{
    //   setUsers(data);

    // })
    
    // socket.on("allUsers", (data)=>{
    //   setUsers(data);

    // })

  },[])
  console.log(users);
  return (

    <div className="container">
      <Routes>
        <Route path="/" element={<Forms socket={socket} setUser={setUser} uuid={()=>uuid()} />}/>
        <Route path='/:roomId' element={<RoomPage  user={user} socket={socket} users={users}/>}/>
      </Routes>
    </div>
  );
};

export default App;
