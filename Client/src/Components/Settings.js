import React from 'react';
import Cookies from 'universal-cookie';
import CssBaseline from '@material-ui/core/CssBaseline';
import { allUserImages, editProfile, userDetails } from './../API/mongo';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoggedInUser from './LoggedInUser';
import PrimarySearchAppBar from '../SocialMedia/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

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
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

function Settings(props) {
    const classes = useStyles();
    const cookies = new Cookies();
    let userId = cookies.get('userId');
    let userName = cookies.get('name');
    let email = cookies.get('email');
    const [loggedUser, setLoggedUser] = React.useState([]);
    const [editedName, setEditedName] = React.useState(userName);
    const [editedEmail, setEditedEmail] = React.useState(email);
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(event.target.checked)
    };

    React.useEffect(() => {
        async function getAllImagesOnLoad() {
            
            let Id = {
                userId : userId
            }

            let data1 = await userDetails(Id);
            if(data1.data.userData[0].account == "private") {
                setChecked(true);
            }
            let data = await allUserImages()
            data = JSON.stringify(data)
            data = JSON.parse(data)
            let imagesData = data.data.Images;
            console.log(imagesData)
            let loggedList = [];
            for (let i = 0; i < imagesData.length; i++) {

                if (data.data.Images[i].userId == userId) {
                    loggedList.push(data.data.Images[i]);
                }
            }
            console.log(loggedList)
            setLoggedUser(loggedList)
        }
        getAllImagesOnLoad()
    }, []);

    const sendDataToParent = (name) => {
        // setSearchText(name);
        // var dupliPhotos = [];
        // for (var i = 0; i < allUsers.length; i++) {
        //   if (allUsers[i].userName == name) {
        //     dupliPhotos.push(allUsers[i])
        //   }
        // }
        // setLoggedUser(dupliPhotos)
    };

    const sendUploadHandler = (data) => {
        // uploadHandler(data)
    }

    const editSubmit = async () => {
        let accountType = "public";
        if(checked) {
            accountType = "private";
        }
        cookies.set('name', editedName, { path: '/' });
        cookies.set('email', editedEmail, { path: '/' });
        let editedData = {
            name: editedName,
            email: editedEmail,
            id: userId,
            account : accountType
        }
        let data = await editProfile(editedData);
        data = JSON.stringify(data)
        data = JSON.parse(data)
        console.log(data)

    }
    return (
        <div>
            { userId == undefined || userId.length > 0 ?
                <div>
                    <LoggedInUser.Provider value={{ loggedUser }}>
                        <PrimarySearchAppBar sendDataToParent={sendDataToParent} sendUploadHandler={sendUploadHandler} />
                    </LoggedInUser.Provider>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>

                            <Avatar className={classes.orange} >{userName[0]}</Avatar>
                            {/* <b>{userName == editedName ? userName : editedName}</b> */}

                            <Typography component="h1" variant="h5">
                                {userName == editedName ? userName : editedName}
                            </Typography>
                            <form className={classes.form} noValidate autoComplete="off">

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="User Name"
                                    name="name"
                                    autoComplete="name"
                                    value={editedName}
                                    onChange={(e) => { setEditedName(e.target.value) }}
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
                                    value={editedEmail}
                                    onChange={(e) => { setEditedEmail(e.target.value) }}
                                // autoFocus
                                />
                                <FormGroup>
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Private Mode:</Grid>
                                            <Grid item>
                                                <AntSwitch checked={checked} onChange={handleChange} name="checked" />
                                            </Grid>
                                        </Grid>
                                    </Typography>
                                </FormGroup>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => editSubmit()}
                                // className={classes.submit}
                                >
                                    Submit
                                </Button>
                    
                            </form>
                        </div>

                    </Container> </div> : props.history.push('/login')
            }
        </div>
    );


}

export default Settings;






