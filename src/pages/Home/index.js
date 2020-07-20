import React, { useContext, useEffect } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { Grid, Typography, Container, Fade } from '@material-ui/core';
import LoginButton from './LoginButton';
import DataContext from 'context/DataContext';
import ErrorFallback from 'common/ErrorFallback';
import ftLogoLight from 'assets/ftLogoLight.png';
import ftLogoDark from 'assets/ftLogoDark.png';
import lhqLogoLight from 'assets/lhqLogoLight.png';
import lhqLogoDark from 'assets/lhqLogoDark.png';
// TODO: import legion ops logo
// import lopsLogoLight from 'assets/lopsLogoLight.png';
// import lopsLogoDark from 'assets/lopsLogoDark.png';

function Home() {
  const {
    auth,
    userSettings,
    fetchUserEvents
  } = useContext(DataContext);

  useEffect(() => {
    if (auth) fetchUserEvents(auth)
  }, [auth])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fade in={true}>
        <Container>
          <Grid
            container
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ marginTop: 5 }}
          >
            <Grid item>
              <img
                alt="Fifth Trooper Logo"
                src={userSettings.themeColor === 'light' ? ftLogoLight : ftLogoDark}
                style={{ width: 150, height: 'auto' }}
              />
            </Grid>
            <Grid item>
              <img
                alt="Legion Ops Logo"
                src={userSettings.themeColor === 'light' ? lhqLogoLight : lhqLogoDark}
                style={{ width: 400, height: 'auto' }}
              />
            </Grid>
            <Grid item style={{ maxWidth: '75vw', textAlign: 'center' }}>
              <Typography variant="subtitle1">
                An unofficial tool for organizing tournaments, and leagues for Fantasy Flight Games: Star Wars: Legion.
              </Typography>
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <LoginButton auth={auth} />
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <iframe
                title="Legion Discord"
                frameBorder="0"
                allowtransparency="true"
                style={{ width: '100%', height: 400 }}
                src="https://discordapp.com/widget?id=349001242489520128&theme=dark&username="
              >
              </iframe>
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </ErrorBoundary>
  );
};

export default Home;