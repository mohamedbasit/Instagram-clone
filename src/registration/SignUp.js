import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from "@material-ui/core";
import "./registration.css"
import { auth } from "../firebase";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));




function SignUp() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //signup the user
    const handleSignUp = (event) => {
        event.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authuser) => {
                return authuser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))

        setOpen(false);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form className="form__signup">
                <center>
                    <img
                        className="app__headerImage"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt=""
                    ></img>
                </center>

                <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <Input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Button type="submit" onClick={handleSignUp}>Sign Up</Button>
            </form>
        </div>
    );


    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                {body}
            </Modal>
            <Button onClick={() => { setOpen(true) }}>Sign Up</Button>
        </>
    )
}

export default SignUp;
