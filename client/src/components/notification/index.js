import React from 'react';
// import { ChannelList } from './ChannelList';
// import './chat.scss';
// import { MessagesPanel } from './MessagesPanel';
function Notification() {
    const SERVER = `http://localhost:${ process.env.PORT || 3000 }`;
    const io = require("socket.io-client");
    const socket = io(SERVER, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
    });
    
    socket.on('connection', () => {
        console.log(`I'm connected to the notifications`);
    })

    return (
        <div className='notifications'>
            
        </div>
    );
}
export default Notification;
