import { io } from "socket.io-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const CreateRoomForm = ({socket ,setUser , uuid=()=>uuid() }) =>{

    const navigate = useNavigate();
    // var socket = io(); 

    const handleCreateRoom = (e) =>  {
        e.preventDefault();
        
        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true
        }

        setUser(roomData);
        navigate(`/${roomId}`);
        console.log(roomData);
        socket.emit("userJoined", roomData);

    }

    const copyTxt=()=> {
        // Get the text field
        let text = roomId;
        console.log(text);
        navigator.clipboard.writeText(text);
        alert("copied ID")
 
      }

    const [roomId,setRoomId]=useState(uuid());
    const [name , setName] = useState("");
  

    return <form className="form col-md-12 mt-5" >
        
        <div className="form-group">
            <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        
            <div className="input-group d-flex align-items-center justify-content-center">
                <input 
                     type="text" 
                     id="idtextcopy"
                     value={roomId}
                     className="form-control my-2" 
                     disabled
                     placeholder="Generate Room Code"
                 />
                 <div className="input-group-append">
                    <button className="btn btn-primary " onClick={() => setRoomId(uuid())} type="button">
                        Generate
                    </button>
                    <button className="btn btn-danger" type="button" onClick={()=>copyTxt()}  >
                        Copy
                    </button>
                 </div>
            </div>
            <button type="submit" onClick={handleCreateRoom} className="mt-4 btn btn-primary btn-block form-control">
                Generate Room
            </button>

    </form>;

};


export default CreateRoomForm