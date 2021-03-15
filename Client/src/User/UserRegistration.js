import React, { useState } from 'react';
import { userRegistration } from './../API/mongo';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function UserRegistration(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const classes = useStyles();
    const cookies = new Cookies();
    const [errName, setErrName] = useState(false);

    const changeName = (e) => {
        var nameVal = e.target.value;
        setName(nameVal)
    }
 
    const changeEmail = (e) => {
        var emailVal = e.target.value;
        setEmail(emailVal)
    }

    const changePwd = (e) => {
        var pwdVal = e.target.value;
        setPwd(pwdVal)
    }

    const Login = () => {
        props.history.push("/login")
    }

    const Register = async () => {
        const userDetails = {
            name: name,
            email: email,
            pwd: pwd
        }
        if(name.length == 0 || email.length == 0 || pwd.length == 0)  
        {   
            setErrName(true)
        }
        else {
        let data = await userRegistration(userDetails);
        if (data.status == 201) {
            console.log("Success");
            cookies.set('userId', data.data.userId, { path: '/' });
            cookies.set('name', name, { path: '/' });
            cookies.set('email',email);
            props.history.push('/home');
        }
        else {
            console.log("Failure")
        }
    }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={changeName}
                        // autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={changeEmail}
                        // autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={changePwd}
                        autoComplete="current-password"
                    />
                    {errName == true ? <div>All Fields are Required</div> : <div></div>}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={Register}
                        className={classes.submit}
                    >
                        Register
                    </Button>
                  
                </form>
                <Typography component="caption" display="block" gutterBottom>
                    Already have an account?
                    <Button size="small" color="primary" onClick={Login}>Login   </Button>
                 </Typography>
            </div>
        </Container>
    );

}

export default UserRegistration;
