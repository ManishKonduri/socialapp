import React, {useState} from 'react';
import {userLogin} from './../API/mongo';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookies from 'universal-cookie';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


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

function UserLogin(props) {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const classes = useStyles();
    const cookies = new Cookies();
    const [errName, setErrName] = useState(false);
    const [errLogin, setErrLogin] = useState(false);
    
    const changeEmail = (e) => {
        var emailVal = e.target.value;
        setEmail(emailVal) 
    }

    const changePwd = (e) => {
        var pwdVal = e.target.value;
        setPwd(pwdVal)
    }

    const Login = async () => {

        let loginDetails = {
            email: email,
            pwd: pwd
        }
        if(email.length == 0 || pwd.length == 0)  
        {   
            setErrName(true)
        }
        else {
          try {
        let data = await userLogin(loginDetails)
        if(data.status == 201) {
          cookies.set('userId', data.data.userId, { path: '/' });
          cookies.set('name', data.data.name, { path: '/' });
          cookies.set('email', email , { path: '/' });
            props.history.push('/home');
            console.log(data.data.userId)
        }
        else {
            console.log("Failure")
        }
          }
          catch(err) {
            setErrLogin(true)
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
          Sign in
        </Typography>
        <form className={classes.form}>
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
          { errLogin == false ? errName == true ? <div>All Fields are Required</div> : <div></div> : <div>Invalid Email or Password</div>}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={Login}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => {props.history.push('/')}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
    //added files

}

export default UserLogin


