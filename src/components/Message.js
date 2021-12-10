import React,{forwardRef} from 'react'
import './Message.css'
import {useSelector} from 'react-redux';
import { selectUser} from '../features/userSlice';




function Message({id, 
  contents:{message,uid,timestamp,displayName,email,photo}
})
{
  const user = useSelector(selectUser)
    return(
        <div className={`message ${user.email===email && "message__sender"}`}>
            <span>{displayName}</span>
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
    )

}

    

export default Message
