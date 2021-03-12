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
  const base64Flag = 'data:image/jpeg;base64,';
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
            if(data.data.Images[i].userId == userId) {
                loggedList.push(data.data.Images[i]);
            }   
        }
        console.log(loggedList)
        setLoggedUser(loggedList)
    }
    getAllImagesOnLoad()
}, []);


//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);
// //-------------------------------------------------------------------------------------------------------------------------------------------------------


//   function SimpleDialog(props) {
//     const classes = useStyles();
//     const { onClose, selectedValue, open1 } = props;
  
//     const handleClose = () => {
//       onClose(selectedValue);
//     };
  
//     const handleListItemClick = (value) => {
//       onClose(value);
//     };
  
//     return (
//       <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open1}>
//         <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
//         <List>
//           {emails.map((email) => (
//             <ListItem button onClick={() => handleListItemClick(email)} key={email}>
//               <ListItemAvatar>
//                 <Avatar className={classes.avatar}>
//                   <PersonIcon />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={email} />
//             </ListItem>
//           ))}
  
//           <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
//             <ListItemAvatar>
//               <Avatar>
//                 <AddIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Add account" />
//           </ListItem>
//         </List>
//       </Dialog>
//     );
//   }
  
//   SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open1: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
//   };
  
//    function SimpleDialogDemo() {
//       console.log("called")
   
  
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = (value) => {
//       setOpen(false);
//       setSelectedValue(value);
//     };
  
//     return (
//       <div>
//         <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//         <br />
//         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//           Open simple dialog
//         </Button>
//         <SimpleDialog selectedValue={selectedValue} open1={open} onClose={handleClose} />
//       </div>
//     );
//   }


//-------------------------------------------------------------------------------------------------------------------------------------------------------


  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  const HomeRender = () => {
    let data = loggedUser;
      return (
        data.length >0 ? (<div className={classes.root}>
            <GridList cellHeight={400} className={classes.gridList} cols={3}>
              {data.map((tile) => (
                <GridListTile key={base64Flag + arrayBufferToBase64(tile.image.data.data)} cols={1}  >
                  <img src={base64Flag + arrayBufferToBase64(tile.image.data.data)} alt="Image" onClick={() => {props.history.go(-1)}}/>
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