import {useEffect} from 'react'
import './App.css';
import ChatBody from './components/ChatBody';
import SideBar from './components/SideBar';
import {useDispatch,useSelector} from 'react-redux';
import {selectUser, login, logout} from './features/userSlice'
import Login from './components/Login';
import {auth} from './firebase'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        //user is logged in
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName

        }))

      }else{
        //user is logged out
        dispatch(logout())

      }
    })

  }, [])

  return (
    <div className="app">
     <div className="app_body">
       {user?
       <>
        <SideBar />
         <ChatBody />
       </>
       :
        <Login />
       }
       
  

     </div>
    </div>
  );
}

export default App;
