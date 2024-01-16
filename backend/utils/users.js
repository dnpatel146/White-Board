const { user } = require("firebase-functions/v1/auth");

const users = [];



const addUser = ({name,userId,roomId,host,presenter})=>{
    const user ={name,userId,roomId,host,presenter};
    users.push(user);
    return users.filter((user) => user.roomId === roomId);

}

const removeUser = (id) => {
    const index = users.findIndex(user => user.userId === id);
    if (index != -1){
        return users.splice(index, 1)[0];
    }
}


const getUser = (id) => {
    return users.find((user) => user.userId === id);
}

const getUserInRoom = (roomId) => {
    return users.filter((user) => user.roomId === roomId);
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
};