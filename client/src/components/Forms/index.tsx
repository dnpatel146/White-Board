import CreateRoomForm from "./RoomcreateForm";
import JoinRoomForm from "./RoomjoinForm";
import "./index.css";

const Forms = ({socket ,setUser , uuid=()=>uuid() }) => {
    return(
        <div className="d-flex row h-100 pt-5 ">
            <div className="col-md-5 form-box p-4 pt-5 mt-5 border rounded-4 mx-auto d-flex flex-column align-items-center bgsetter">
                <h1 className="text-primary fw-bold text-white">Create Room</h1>
                <CreateRoomForm socket={socket} setUser={setUser} uuid={()=>uuid()} />
            </div>
            <div className="col-md-5 form-box p-4 pt-5  mt-5 border rounded-4 mx-auto d-flex flex-column align-items-center bgsetter">
                <h1 className="text-primary fw-bold text-white" >Join Room</h1>
                <JoinRoomForm socket={socket} setUser={setUser} uuid={()=>uuid()} />
            </div>
        </div>
    )

}

export default Forms;