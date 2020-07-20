import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import DataContext from 'context/DataContext';

function NavDrawerLink({ selected, icon, text, handleClick }) {
  return (
    <ListItem button selected={selected} onClick={handleClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

function NavigationDrawer() {
  const location = useLocation();
  const { pathname } = location;
  const {
    isDrawerOpen,
    routes,
    faction,
    goToPage,
    setIsDrawerOpen
  } = useContext(DataContext);
  return (
    <SwipeableDrawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
    >
      <div style={{ width: 250 }}>
        <List>
          <ListItem>
            <ListItemText primary="Legion Ops" secondary="The Fifth Trooper" />
          </ListItem>
        </List>
        <List dense={true}>
          <NavDrawerLink
            text="Home"
            selected={pathname === '/'}
            icon={routes['/'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/');
            }}
          />
          {/*<NavDrawerLink*/}
          {/*  text="News"*/}
          {/*  selected={pathname === '/news'}*/}
          {/*  icon={routes['/news'].icon}*/}
          {/*  handleClick={() => {*/}
          {/*    setIsDrawerOpen(false);*/}
          {/*    goToPage('/news');*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<NavDrawerLink*/}
          {/*  text="Cards"*/}
          {/*  selected={pathname === '/cards'}*/}
          {/*  icon={routes['/cards'].icon}*/}
          {/*  handleClick={() => {*/}
          {/*    setIsDrawerOpen(false);*/}
          {/*    goToPage('/cards');*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<NavDrawerLink*/}
          {/*  text="Dice Roller"*/}
          {/*  selected={pathname === '/roller'}*/}
          {/*  icon={routes['/roller'].icon}*/}
          {/*  handleClick={() => {*/}
          {/*    setIsDrawerOpen(false);*/}
          {/*    goToPage('/roller');*/}
          {/*  }}*/}
          {/*/>*/}
        </List>
        <Divider />
        <List dense={true}>
          <NavDrawerLink
            text="Tournaments"
            selected={pathname === '/events/ffgop' || faction === 'ffgop'}
            icon={routes['/list/rebels'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/events/ffgop');
            }}
          />
          {/*<NavDrawerLink*/}
          {/*  text="Empire"*/}
          {/*  selected={pathname === '/list/empire' || faction === 'empire'}*/}
          {/*  icon={routes['/list/empire'].icon}*/}
          {/*  handleClick={() => {*/}
          {/*    setIsDrawerOpen(false);*/}
          {/*    goToPage('/list/empire');*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<NavDrawerLink*/}
          {/*  text="Republic"*/}
          {/*  selected={pathname === '/list/republic' || faction === 'republic'}*/}
          {/*  icon={routes['/list/republic'].icon}*/}
          {/*  handleClick={() => {*/}
          {/*    setIsDrawerOpen(false);*/}
          {/*    goToPage('/list/republic');*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<NavDrawerLink*/}
          {/*  text="Separatists"*/}
          {/*  selected={pathname === '/list/separatists' || faction === 'separatists'}*/}
          {/*  icon={routes['/list/separatists'].icon}*/}
          {/*  handleClick={() => {*/}
          {/*    setIsDrawerOpen(false);*/}
          {/*    goToPage('/list/separatists');*/}
          {/*  }}*/}
          {/*/>*/}
        </List>
        <Divider />
        <List dense={true}>
          <NavDrawerLink
            text="Settings"
            selected={pathname === '/settings'}
            icon={routes['/settings'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/settings');
            }}
          />
          <NavDrawerLink
            text="Info"
            selected={pathname === '/info'}
            icon={routes['/info'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/info');
            }}
          />
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
