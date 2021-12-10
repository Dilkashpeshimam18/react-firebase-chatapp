import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MicIcon from '@mui/icons-material/Mic';
import './ChatBody.css'
import { selectChatId, selectChatName } from '../features/chatSlice';
import {useSelector} from 'react-redux';
import db from '../firebase';
import Message from './Message';
import firebase from 'firebase'
import 'firebase/firestore';

import { selectUser } from '../features/userSlice';

function ChatBody() {
    const user = useSelector(selectUser)
    const [input,setInput]= useState('')
    const [messages,setMessages] = useState([])
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)

    useEffect(()=>{
        if(chatId){
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) =>(
                setMessages(snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                })))
            ))
        }

    },[chatId])


    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('chats').doc('chatId').collection('messages').add({
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            uid:user.uid,
            photo:user.photo,
            email:user.email,
            displayName:user.displayName

        })
        setInput('')
    }
       
    

    return (
        <div className="chatBody">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{chatName}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchRoundedIcon/></IconButton>
                    <IconButton><AttachmentRoundedIcon/></IconButton>
                    <IconButton><ExpandMoreRoundedIcon/></IconButton>
                </div>
            </div>
            <div className="chat__body">

                {messages.map(({id,data})=>{
                      <Message key={id} id={id} contents={data} />
                    
                })}
       
            </div>
            <div className="chat__footer">
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Type your message" />
                    <button onClick={sendMessage} type="submit">Send Message</button>
                  <CameraAltOutlinedIcon />
                   <MicIcon />
                </form>

  
            </div>
            
        </div>
    )
}

export default ChatBody
