import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { loggedIn } from '../../app/store'
import { AuthLogout } from '../../api/services/auth';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router';


export default function NavigationBar() {
    const history = useHistory();

    const menuItems = [
      {
        text: "Clients",
        icon: null,
        path: "/admin/clients",
      },
      {
        text: "Devices",
        icon: null,
        path: "/admin/devices",
      },
    ];

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                history.push(item.path);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">

        <Toolbar>
        <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        anchor === "left" ?
        <React.Fragment key={anchor}>
          {loggedIn() ? <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon/>
          </IconButton> : null}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
        : null
      ))}

    </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Energy Utility Platform
          </Typography>
          {loggedIn() ? <Button color="inherit" onClick={() => { AuthLogout();history.push("/");}}>Logout</Button> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
