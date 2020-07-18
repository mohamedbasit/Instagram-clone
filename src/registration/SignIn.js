import React, { useState } from 'react'
import { auth } from '../firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from "@material-ui/core";
import "./registration.css"


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



function SignIn() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //signIn the user
    const handleSignIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
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
                <Button type="submit" onClick={handleSignIn}>Sign In</Button>
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
            <Button onClick={() => { setOpen(true) }}>Sign In</Button>
        </>
    )
}

export default SignIn
