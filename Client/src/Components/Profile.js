import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Cookies from 'universal-cookie';
import TemporaryDrawer from "../Components/Drawer";
import { allUserImages } from './../API/mongo';

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
  console.log(userId)
  let userName = cookies.get('name');
  const [loggedUser, setLoggedUser] = React.useState([]);

  React.useEffect(() => {
    async function getAllImagesOnLoad() {
        let data = await allUserImages()
        data = JSON.stringify(data)
        data = JSON.parse(data)
        let imagesData = data.data.Images;
        let loggedList = [];
        for (let i = 0; i < imagesData.length; i++) {          
            if(imagesData[i].userId == userId) {
                loggedList.push(data.data.Images[i]);
            }   
        }
        console.log(loggedList)
        setLoggedUser(loggedList)
    }
    getAllImagesOnLoad()
}, []);

  const HomeRender = () => {
    let data = loggedUser;
      return (
        data.length >0 ? (<div className={classes.root}>
            <GridList cellHeight={400} className={classes.gridList} cols={3}>
              {data.map((tile) => (
                <GridListTile key={tile._id} cols={1}  >
                  <img src={tile.image} alt="Image" onClick={() => {props.history.go(-1)}}/>
                </GridListTile>
              ))}
            </GridList>
          </div>) : <div>No Images yet</div>
      );
      
      
    }

  return (
   
    <div>
      { userId !== undefined ? 
      <div>
      <TemporaryDrawer />
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
          {userName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <b>{loggedUser.length}</b> posts
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