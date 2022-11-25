import { Avatar } from '@mui/material';
import React from 'react';
import "./notification.css";

function Notification(props) {
    return (
        <div id="notification" className="d-flex">
            <Avatar className="avatarImg"/>
            <div className="content">{props.notification.content}</div>
        </div>
    );
}

export default Notification;