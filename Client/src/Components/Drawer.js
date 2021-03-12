import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import LoggedInUser from '../Components/LoggedInUser';
import Profile from '../Components/Profile';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const cookies = new Cookies();
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    right: false,
  });
  const [open, setOpen] = React.useState(false);

  let {userId, name, loggedUser} = React.useContext(LoggedInUser);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const disableCurrentOption = () => {
    if(history.location.pathname == "/profile") {
      return (
        <React.Fragment>
        <ListItem disabled button key="Profile"> <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
        <ListItemText primary="Profile" onClick = {() => {navigatePage("/profile")}} />
      </ListItem>
      <ListItem button key="Settings"> <ListItemIcon><SettingsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Settings" onClick = {() => {navigatePage("/settings")}} />
          </ListItem>
      </React.Fragment>
      )
    }
    else if (history.location.pathname == "/settings") {
      return (
        <React.Fragment>
        <ListItem button key="Profile"> <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
        <ListItemText primary="Profile" onClick = {() => {navigatePage("/profile")}} />
      </ListItem>
      <ListItem disabled button key="Settings"> <ListItemIcon><SettingsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Settings" onClick = {() => {navigatePage("/settings")}} />
          </ListItem>
      </React.Fragment>
      )
    }
    else if(history.location.pathname == '/home') {
      return (
        <React.Fragment>
        <ListItem button key="Profile"> <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
        <ListItemText primary="Profile" onClick = {() => {navigatePage("/profile")}} />
      </ListItem>
      <ListItem button key="Settings"> <ListItemIcon><SettingsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Settings" onClick = {() => {navigatePage("/settings")}} />
          </ListItem>
      </React.Fragment>
      )
    }
  }

  const navigatePage = (page) => {
    history.push({pathname: page, state: {loggedUser: loggedUser}});
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
         {disableCurrentOption()}
      </List>
      <Divider />
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <ExitToAppRoundedIcon /> : <SettingsRoundedIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{textAlign:"end"}}>
        
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{
               <Toolbar>

                 <MenuIcon />

             </Toolbar>
          }</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
          
        </React.Fragment>
      ))}
    </div>
  );
}
