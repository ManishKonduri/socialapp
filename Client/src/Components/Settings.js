import React from 'react';
import Cookies from 'universal-cookie';
import TemporaryDrawer from "../Components/Drawer";
import { allUserImages, editProfile} from './../API/mongo';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1).Images
        },
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
const useStylesOne = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        },
    },
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

function Settings(props) {
    const classes = useStyles();
    const classesOne = useStylesOne();
    const cookies = new Cookies();
    let userId = cookies.get('userId');
    let userName = cookies.get('name');
    let email = cookies.get('email');
    const [loggedUser, setLoggedUser] = React.useState([]);
    const [editedName, setEditedName] = React.useState(userName);
    const [editedEmail, setEditedEmail] = React.useState(email);

    React.useEffect(() => {
        async function getAllImagesOnLoad() {
            let data = await allUserImages()
            data = JSON.stringify(data)
            data = JSON.parse(data)
            let imagesData = data.data.Images;
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

    const editSubmit = async () => {
        cookies.set('name', editedName, { path: '/' });
        cookies.set('email', editedEmail, { path: '/' });
        let editedData = {
            name: editedName,
            email: editedEmail,
            id: userId,
        }
        let data = await editProfile(editedData);
        data = JSON.stringify(data)
        data = JSON.parse(data)
        console.log(data)

    }

    return (
        <div>
            { userId !== undefined ? 
                <div>
            <TemporaryDrawer />
            <div className={classes.root}>
                <div style={{ width: '500px', marginLeft: '40%' }}>
                    <div style={{ marginLeft: '43%' }}>
                        <Avatar className={classes.orange} >{userName[0]}</Avatar>
                        <b>{userName == editedName ? userName : editedName}</b>
                    </div>
                    <form className={classesOne.form} noValidate autoComplete="off">

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
                        {/* 
                    <TextField id="filled-basic" label="Name" value={userName} variant="filled" /><br />
                    <TextField id="filled-basic" label="Email" value={email} variant="filled" /> */}

                    </form>
                </div>
            </div>
        </div> : props.history.push('/login')
            }
        </div>
    );


}

export default Settings;