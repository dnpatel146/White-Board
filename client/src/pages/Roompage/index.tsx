import { useRef, useState } from "react"
import "./index.css"
import WhiteBoard from "../../components/Whiteboard";

const RoomPage = ({user, socket, users}) => {
    console.log(user);

    // const check:boolean = user.presenter;
    // console.log(user);

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);


    const [tool,setTool] = useState('pencil');
    const [color, setColor] = useState('black');
    const [elements, setElements]= useState([]);
    const [history, setHistory]= useState<any>([]);


    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillRect = "white";
        ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        setElements([]);
    }

    const redo = () => {
        

            // setElements((prevElements) => [...prevElements, history[history.length-1]]);
            // setElements((prevElements) => [prevElements.slice(0, prevElements.length-1)]);
            // const b = elements.pop();
            // setElements((prevElements) => [prevElements]);
            // setHistory([...history]);
            elements.push(history[history.length-1]);
            history.pop();
            console.log(elements.length);
            console.log(history.length);
            setHistory([...history]);
            setElements([...elements]);
            // elements.pop();
        
    }

    const undo = () => {
        if(elements.length===1){
            handleClearCanvas();
        }
        // setHistory((prevHistory) => [...prevHistory, elements[elements.length-1]]);
        // setElements((prevElements) => [prevElements.slice(0, prevElements.length-1)]);
        // const b = elements.pop();
        // setElements((prevElements) => [prevElements]);
        // setHistory([...history]);
        history.push(elements[elements.length-1]);
        elements.pop();
        setHistory([...history]);
        console.log(elements.length);
        console.log(history.length);
        setElements([...elements]);
        // elements.pop();
    }

  return (
    <div className="row y ">
        <h1 className="text-center py-5 ">
            White Board Sharing App{" "}
            <span className="text-primary">[User_Online: {users.length | 0}]</span>
        </h1>


       {user?.presenter &&(

                <div className=" gap-5 mt-4 mx-auto mb-5 d-flex align-items-center justify-content-center">
            <div className="d-flex gap-3 col-md-4 align-items-center justify-content-center mt-1">
                <div className="d-flex gap-1 align-items-center">
                <label htmlFor="pencil">Pencil</label>
                <input 
                    type="radio" 
                    name="tool" 
                    id="pencil" 
                    value="pencil"
                    checked={tool === "pencil"}
                    placeholder="pencil" 
                    onChange={(e)=>setTool(e.target.value)}
                />
                </div>

                <div className="d-flex gap-1 align-items-center">
                <label htmlFor="line">Line</label>
                <input 
                    type="radio" 
                    name="tool" 
                    id="line" 
                    value="line"
                    checked={tool === "line"}
                    placeholder="line" 
                    onChange={(e)=>setTool(e.target.value)}
                />
                </div>

                <div className="d-flex gap-1 align-items-center">
                <label htmlFor="rect">Rectangle</label>
                <input 
                    type="radio" 
                    name="tool" 
                    id="rect" 
                    value="rect"
                    checked={tool === "rect"}
                    placeholder="rectangle" 
                    onChange={(e)=>setTool(e.target.value)}
                />
                </div>
            </div>
            <div className="col-md-3 gap-1">
                <div className="d-flex align-items-center gap-1">
                    <label htmlFor="color">Select Color:</label>
                    <input 
                        type="color"
                        id="color"
                        className="mt-1"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-2 d-flex gap-2">
                <button className="btn btn-primary" disabled={elements.length === 0} onClick={() => undo()}>Undo</button>
                
                <button className="btn btn-outline-primary" disabled={history.length === 0} onClick={() => redo() }>Redo</button>
            </div>
            <div className="col-md-2">
                <button className="btn btn-danger"onClick={handleClearCanvas}>Clear Canvas</button>
            </div>
                </div>
       )
}

            

        <div className="mt-4 canvas-box">
            <WhiteBoard 
                canvasRef={canvasRef} 
                ctxRef={ctxRef}
                elements={elements}
                setElements={setElements}
                color= {color}
                tool={tool}
                user={user}
                socket={socket}
            />
        </div>
    </div>
  )
}


export default RoomPage