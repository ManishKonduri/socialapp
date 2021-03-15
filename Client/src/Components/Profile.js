import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Cookies from 'universal-cookie';
import { allUserImages } from './../API/mongo';
import PrimarySearchAppBar from '../SocialMedia/AppBar';
import LoggedInUser from '../Components/LoggedInUser';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const cookies = new Cookies();
  let userId = cookies.get('userId');

  let userName = cookies.get('name');

  const [loggedUser, setLoggedUser] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [newImg, setNewImg] = React.useState('');


  React.useEffect(() => {
    async function getAllImagesOnLoad() {
      let data = await allUserImages()
      data = JSON.stringify(data)
      data = JSON.parse(data)
      let imagesData = data.data.Images;
      setAllUsers(imagesData);
      let loggedList = [];
      for (let i = 0; i < imagesData.length; i++) {
        if (imagesData[i].userId == userId) {
          loggedList.push(data.data.Images[i]);
        }
      }
      setLoggedUser(loggedList)
    }
    getAllImagesOnLoad()
  }, []);

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
        const image = await resizeFile(file);
        let data = {
            'userId' : userId,
            'name' : userName,
            'image' : image
        }

        axios.post("http://localhost:4000/home", data).then(res => setNewImg(res.data));
        props.history.push("/home")
        
    } catch(err) {
        console.log(err)
    }

}

  const sendDataToParent = (name) => {
    setSearchText(name);
    var dupliPhotos = [];
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].userName == name) {
        dupliPhotos.push(allUsers[i])
      }
    }
    setLoggedUser(dupliPhotos)
  };

  const sendUploadHandler = (data) => {
    uploadHandler(data)
  }

  const HomeRender = () => {
    let data = loggedUser;
    
    return (
      data.length > 0 ? (<div className={classes.root}>
        <GridList cellHeight={400} className={classes.gridList} cols={3}>
          {data.map((tile) => (
            <GridListTile key={tile._id} cols={1}  >
              <img src={tile.image} alt="Image" onClick={() => { props.history.go(-1) }} />
            </GridListTile>
          ))}
        </GridList>
      </div>) : <div>No Images yet</div>
    );


  }

  return (

    <div>
      <LoggedInUser.Provider value={{ loggedUser }}>
        <PrimarySearchAppBar sendDataToParent={sendDataToParent} sendUploadHandler={sendUploadHandler} />
      </LoggedInUser.Provider>
      {userId == undefined || userId.length>0 ?
        <div>

          <Card className={classes.root} variant="outlined">

            <CardContent>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPJ9cm0-r5p50py0yUzvM5ZtEB-xWoJRPRA&usqp=CAU"
                alt="Paella dish"
              />
            </CardContent>
            <CardContent>

              {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPJ9cm0-r5p50py0yUzvM5ZtEB-xWoJRPRA&usqp=CAU */}
              <Typography variant="h5" component="h2">
                {searchText.length > 0 ? searchText : userName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <b>{newImg.length > 0 ? loggedUser.length + 1 : loggedUser.length }</b> posts
        </Typography>
            </CardContent>




          </Card>

          <div style={{ marginTop: "100px" }}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              spacing={1}>
              {HomeRender()}
            </Grid>
            {/* <SimpleDialogDemo /> */}
          </div>
        </div> :
        props.history.push("/login")
      }
    </div>
  )
}

export default Profile;