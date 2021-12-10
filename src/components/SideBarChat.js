import React,{useState,useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import './SideBarChat.css'
import {useDispatch} from "react-redux"
import {setChat} from '../features/chatSlice'
import db,{auth} from '../firebase'


function SideBarChat({id, chatName}) {
    const[chatInfo,setChatInfo]= useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        db.collection('chats')
        .doc(id)
        .collection('message')
        .orderBy('timestamp','desc').onSnapshot(snapshot=>(
            setChatInfo(snapshot.docs.map((doc)=>doc.data()))
        ))

    },[id])
    return (
        <div onClick={()=>
            dispatch(
                setChat({
                    chatId :id,
                    chatName: chatName,
                })
            )
        } className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
            <h3>{chatName}</h3>
            <p>{chatInfo[0]?.message}</p>
        </div>
            
        </div>
    )
}

export default SideBarChat
