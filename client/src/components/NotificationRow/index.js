import React from "react";
import "./style.css";

function NotificationRow({notification}) {
    console.log({notification: notification});
    let note = '';
    if (notification.method === 'add') {
        note = `Added ${ notification.book }`;
    } else {
        note = `Removed ${ notification.book }`;
    }

    if (note.length > 30) {
        note = `${ note.substring(0, 27)} ...`;
    }

    return (
       <div className='notificationRow'>
           {note}
       </div>
    );
}


export default NotificationRow;
