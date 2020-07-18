import React from 'react'
import "./header.css"
import SignIn from "../registration/SignIn";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";

function Header({ user }) {
    return (
        <div className="app__header">
            <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
            ></img>

            {
                user ?
                    (<Button onClick={() => { auth.signOut() }}>Logout</Button>)
                    :
                    (
                        <div className="app__loginContainer">
                            {/* <SignUp /> */}
                            <SignIn />
                        </div>
                    )
            }
        </div>
    )
}

export default Header;