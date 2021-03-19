import React, { Component } from 'react';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { allUserImages, likesUpload, updatePage, userDetails } from './../API/mongo';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../Components/SearchBar';
import TemporaryDrawer from "../Components/Drawer";
import LoggedInUser from '../Components/LoggedInUser';
import Cookies from 'universal-cookie';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Resizer from 'react-image-file-resizer';
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import PrimarySearchAppBar from './AppBar';


// const client = new W3CWebSocket('ws://192.168.0.115:8000/');
// client.binaryType = 'arraybuffer';

function Home(props) {
    const [photos, setPhotos] = React.useState([]);
    const [dupPhotos, setDupPhotos] = React.useState([]);
    const [loggedUser, setLoggedUser] = React.useState([]);
    const [newPost, setNewPost] = React.useState([]);
    const [updateId, setUpdateId] = React.useState('');
    const [account, setAccount] = React.useState('');
    const cookies = new Cookies();
    let userId = cookies.get('userId');
    let name = cookies.get('name');
    let date = new Date()
    let dupliPhotos = [];
    const [newImg, setNewImg] = React.useState('');
    const [likes, setLikes] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [id, setId] = React.useState('');


    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
            '& > *': {
                margin: theme.spacing(1),

            },
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 500, 500, 'JPEG', 65, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });


    const uploadHandler = async (event) => {
        try {
            const file = event.target.files[0];
            console.log(file)
            const image = await resizeFile(file);
            console.log(image)
            let data = {
                'userId': userId,
                'name': name,
                'image': image,
                'account': account
            }

            axios.post("http://localhost:4000/home", data).then(res => setNewImg(res.data));
            console.log(image);
        } catch (err) {
            console.log(err);
        }

        //     client.send(JSON.stringify({
        //         type: "contentchange",
        //         username: {
        //             'userId': userId,
        //             'name': name
        //         }
        //     }));
    }

    const likePost = async (userid, username, id, post) => {

        if (post == 1) {
            let index = photos.findIndex(x => x._id === id);
            let likeArray = photos[index].likes;
            let uName = likeArray.indexOf(username)
            if (uName >= 0) {

                let lList = likes
                lList[index].likes.splice(uName, 1);
                setCount(lList[index].likes.length)
                setLikes(lList)
                const likeObj = {
                    id: id,
                    likes: lList[index].likes
                }

                await likesUpload(likeObj).then(resp => console.log(resp));

            }
            else {
                let lList = likes
                lList[index].likes.push(username)
                setCount(lList[index].likes.length)
                setLikes(lList)
                const likeObj = {
                    id: id,
                    likes: lList[index].likes
                }

                await likesUpload(likeObj).then(resp => console.log(resp));

            }

        }
        else {
            // let index = newImg.image.likes.findIndex(x => x.id === id);
            let likeArray = newImg.image.likes;
            let uName = likeArray.indexOf(username)
            if (uName >= 0) {

                likeArray.splice(uName, 1);
                newImg.image.likes.splice(uName, 1);
                // setLikeCount(newImg.image.likes.length);
                setCount(likeArray.length)
                const likeObj = {
                    id: id,
                    likes: likeArray
                }

                await likesUpload(likeObj).then(resp => console.log(resp));

            }
            else {
                // likeArray.push(username)
                newImg.image.likes.push(username)
                setCount(newImg.image.likes.length)
                // setLikeCount(newImg.image.likes.length);

                const likeObj = {
                    id: id,
                    likes: newImg.image.likes
                }

                await likesUpload(likeObj).then(resp => console.log(resp));

            }

        }
    }
    const classes = useStyles();
    const base64Flag = 'data:image/jpeg;base64,';

    const showLikes = () => {
        console.log("clicked")
    }

    
    const HomeRender = (data, flag) => {

        const classes = useStyles();
        if (data.length > 0) {
            let searched = 0;
            const dataImages = data.map((image, index) => {
                if (image != undefined) {
                    if(flag == 3) {
                    if (image.userId == userId || image.account == "public" ) {
                        if (likes.length > 0) {
                            var date = new Date(image.createdAt)

                            return (
                                <div>
                                    <Card className={classes.root}>
                                        <CardHeader
                                            onClick={
                                                () => {
                                                    searchAction(image.userName)
                                                }
                                            }
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    {image.userName[0]}
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={image.userName}
                                            subheader={date.toDateString()}
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            // image={base64Flag + arrayBufferToBase64(image.image.data.data)}
                                            image={image.image}
                                            title="Paella dish"
                                        />
                                        <CardContent>

                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites" onClick={() => {
                                                likePost(userId, name, image._id, 1)
                                                setId(image._id)
                                            }}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <div onClick={() => showLikes()}>

                                                <Typography variant="body2" color="textSecondary" component="p">

                                                    {flag == 1 ? (id == image._id ? count + " " : likes[index].likes.length + " ") : (id == image._id ? count + " " : image.likes.length + " ")}

                                    likes
                                    </Typography>
                                            </div>

                                        </CardActions>


                                    </Card><br />
                                </div>

                            );
                        }
                    }
                    else {
                       searched = searched + 1;
                       if(searched  == 1) {
                        return (
                            <div>Private Account</div>
                        );
                       }
                       else {
                           return <React.Fragment></React.Fragment>
                       }
                    }
                }
                else {
                    if (likes.length > 0) {
                        var date = new Date(image.createdAt)

                        return (
                            <div>
                                <Card className={classes.root}>
                                    <CardHeader
                                        onClick={
                                            () => {
                                                searchAction(image.userName)
                                            }
                                        }
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                {image.userName[0]}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={image.userName}
                                        subheader={date.toDateString()}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        // image={base64Flag + arrayBufferToBase64(image.image.data.data)}
                                        image={image.image}
                                        title="Paella dish"
                                    />
                                    <CardContent>

                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites" onClick={() => {
                                            likePost(userId, name, image._id, 1)
                                            setId(image._id)
                                        }}>
                                            <FavoriteIcon />
                                        </IconButton>
                                        <div onClick={() => showLikes()}>

                                            <Typography variant="body2" color="textSecondary" component="p">

                                                {flag == 1 ? (id == image._id ? count + " " : likes[index].likes.length + " ") : (id == image._id ? count + " " : image.likes.length + " ")}

                                likes
                                </Typography>
                                        </div>

                                    </CardActions>


                                </Card><br />
                            </div>

                        );
                    }
                }
                }
            });


            return dataImages;
        }
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    // React.useEffect(() => {
    //     async function test() {
    //         if(updateId != userId) {
    //                 let Image = await updatePage({ 'id': updateId })
    //                 setNewPost(Image.data.Image)
    //                 console.log(Image.data.Image)
    //             }
    //         }
    //     test();
    // }, [updateId]);

    React.useEffect(() => {
        let pics = photos;
        pics.push(newPost[0])
        setPhotos(pics)
        let list = likes
        if (newPost.length > 0) {
            let dataI = {
                likes: newPost[0].likes,
                id: newPost[0]._id
            }
            console.log(dataI)
            list.push(dataI)
            setLikes(list)
            console.log(photos)
            console.log(likes)
        }

    }, [newPost])

    React.useEffect(() => {
        const her = async (id) => {
            if (id != userId) {
                let Image = await updatePage({ 'id': id })
                setNewPost(Image.data.Image)
                console.log(Image.data.Image)
            }
        }

        async function getAllImagesOnLoad() {
            // client.onopen = () => {
            //     console.log('WebSocket Client Connected');
            // };
            // client.onmessage = (message) => {
            //     const dataFromServer = JSON.parse(message.data);
            //     const stateToChange = {};
            //     if (dataFromServer.type === "userevent") {
            //         stateToChange.currentUsers = Object.values(dataFromServer.data.users);
            //     } else if (dataFromServer.type === "contentchange") {
            //         stateToChange.text = dataFromServer.data.editorContent || "---";
            //     }
            //     stateToChange.userActivity = dataFromServer.data.userActivity;
            //     console.log(stateToChange.text.username.userId)
            //     setTimeout(() => {
            //         her(stateToChange.text.username.userId)
            //     }, 4000)

            // };
            
            let Id = {
                userId: userId
            }
            if(userId.length > 0 ) {
            let data1 = await userDetails(Id);
            setAccount(data1.data.userData[0].account);
            }

            let data = await allUserImages()
            data = JSON.stringify(data)
            data = JSON.parse(data)
            console.log(data.data.Images);
            setPhotos(data.data.Images);
            let imagesData = data.data.Images;
            let list = [];
            let loggedList = [];
            for (let i = 0; i < imagesData.length; i++) {
                let dataI = {
                    likes: data.data.Images[i].likes,
                    id: data.data.Images[i]._id
                }
                if (data.data.Images[i].userId == userId) {
                    loggedList.push(data.data.Images[i]);
                }
                list.push(dataI)
            }
            setLoggedUser(loggedList)
            setLikes(list)
        }
        getAllImagesOnLoad();



    }, [])

    const searchAction = (nameS) => {

        for (var i = 0; i < photos.length; i++) {
            if (photos[i].userName == nameS) {
                dupliPhotos.push(photos[i])
            }
        }
        setDupPhotos(dupliPhotos)


    }

    const sendDataToParent = (index) => {
        // setSearchText(index);
        for (var i = 0; i < photos.length; i++) {
            if (photos[i].userName == index) {
                dupliPhotos.push(photos[i])
            }
        }
        setDupPhotos(dupliPhotos)
    };

    const sendUploadHandler = (data) => {
        uploadHandler(data)
    }

    return (
        <div>
            <LoggedInUser.Provider value={{ loggedUser }}>
                <PrimarySearchAppBar sendDataToParent={sendDataToParent} sendUploadHandler={sendUploadHandler} />
            </LoggedInUser.Provider>

            <div style={{ marginTop: '80px' }}>

                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={10}>
                    {updateId == userId ? <div></div> : HomeRender(newPost, 0)}
                    {newImg == '' ? <div /> : <div>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {name[0]}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={name}
                                subheader={date.toDateString()}
                            />

                            <CardMedia
                                className={classes.media}
                                // image={base64Flag + arrayBufferToBase64(newImg.image.image.data.data)}
                                image={newImg.image.image}
                                title="Paella dish"
                            />
                            <CardContent>

                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" onClick={() => {
                                    likePost(userId, name, newImg.image._id, 0)
                                    setId(newImg.image._id)
                                }
                                }>
                                    <FavoriteIcon />
                                </IconButton>
                                <div onClick={() => showLikes()}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {
                                            id == newImg.image._id ? count + " " : newImg.image.likes.length + " "
                                        }
                                    likes
                                    </Typography>
                                </div>
                            </CardActions>

                        </Card><br />
                    </div>}

                    {dupPhotos.length == 0 ? HomeRender(photos, 1) : HomeRender(dupPhotos, 3)}
                </Grid>
            </div>

        </div>
    )

}

export default Home;