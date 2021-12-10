import React,{useState,useEffect} from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import './SideBar.css'
import SideBarChat from './SideBarChat';
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import db,{auth} from '../firebase'




function SideBar() {
    const [chat, setChat] = useState([]);
    const user = useSelector(selectUser);
    
    useEffect(() => {
        db.collection("chats").onSnapshot(snapshot =>
          setChat(
            snapshot.docs.map(doc => {
              return {
                id: doc.id,
                data: doc.data()
              };
            })
          )
        );
      }, []);

    const addChat = () =>{
        const chatName = prompt("Enter your chat name")

        if(chatName){
            db.collection('chats').add({
                chatName: chatName,
            });
          

        }
    };
  
    return (
        <div className="sideBar">
         
            <div className="sidebar__header">
                <Avatar src={user.photo} />
                <div className="header__Right">
                    <IconButton><LogoutRoundedIcon onClick={()=>auth.signOut()} /></IconButton>
                    <IconButton><AddCircleRoundedIcon onClick={addChat}/></IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchRoundedIcon />
                <input placeholder="Search" type="text" />
                </div>
            </div>
            <div className="sidebar__chat">
                {chat.map(({id,data:{chatName}}) => {
                   return <SideBarChat key={id} id={id} chatName={chatName} />
                })}

            </div>
                            
        </div>

         
    )
}

export default SideBar
