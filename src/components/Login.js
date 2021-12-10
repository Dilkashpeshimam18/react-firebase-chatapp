import React from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import {auth,provider} from '../firebase'


function Login(){
    const signIn = ()=>{
        auth.signInWithPopup(provider).catch((error)=>alert(error.message))

    }
    return(
        <div className="login">
            <h1>HeyThere</h1>
            <Button onClick={signIn} variant="contained">SIGN IN</Button>
            

        </div>

    )
}

export default Login