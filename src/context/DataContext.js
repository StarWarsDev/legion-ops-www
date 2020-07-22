import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from '@material-ui/icons';
import Icon from '@mdi/react'
import { mdiTournament } from '@mdi/js'
import ErrorFallback from 'common/ErrorFallback';
import auth0Client from 'utility/Auth';
import urls from 'constants/urls';
import settings from 'constants/settings';
import { queryEvents, queryMyEvents } from "../api";

const DataContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

const fontSize = 26;

const routes = {
  '/': {
    name: 'Home',
    path: '/',
    icon: <HomeIcon style={{ fontSize }} />
  },
  '/tournaments': {
    name: 'Tournaments',
    path: '/tournaments',
    icon: <Icon path={mdiTournament} size={1} />
  },
  '/settings': {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon style={{ fontSize }} />
  },
  '/info': {
    name: 'Info',
    path: '/info',
    icon: <InfoIcon style={{ fontSize }} />
  }
};

function initializeLocalSettings() {
  if (typeof(Storage) !== 'undefined') {
    const localSettings = JSON.parse(window.localStorage.getItem('settings'));
    return {
      ...settings.default,
      ...localSettings
    };
  }
  return settings.default;
}

const eventsInitialState = {
  tournament: [],
  league: [],
  other: []
};

export function DataProvider({ children }) {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [auth, setAuth] = useState();
  const [error, setError] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [userLists, setUserLists] = useState([]);
  const [events, setEvents] = useState(eventsInitialState);
  const [userEvents, setUserEvents] = useState(eventsInitialState);
  const [userSettings, setUserSettings] = useState(initializeLocalSettings());

  useEffect(() => {
    const asyncSilentAuth = async () => {
      try {
        await auth0Client.silentAuth();
        setAuth(auth0Client);
      } catch {
        setAuth(auth0Client);
      }
    }
    asyncSilentAuth()

    fetchEvents()
  }, []);
  
  useEffect(() => {
    if (auth && auth.isAuthenticated() && !userId) {
      fetchHQUserId(auth.getEmail());
    }

    if (auth && auth.isAuthenticated()) {
      fetchUserEvents(auth)
      const fetchEventsInterval = setInterval(() => {
        fetchUserEvents(auth)
      }, 5000)
      return () => clearInterval(fetchEventsInterval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userId) {
        console.log(`Fetching lists for userId: ${userId}`);
        fetchUserLists(userId);
      } else if (auth && auth.isAuthenticated() && !userId) {
        console.log(`Logging in user with email: ${auth.getEmail()}`);
        fetchHQUserId(auth.getEmail());
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [userId, auth]);

  const setUserSettingsValue = (key, value) => {
    if (typeof(Storage) !== 'undefined') {
      const newSettings = {
        ...userSettings,
        [key]: value
      };
      window.localStorage.setItem('settings', JSON.stringify(newSettings));
      setUserSettings(newSettings)
    }
  }
  const goToPage = (newRoute) => history.push(newRoute);

  const fetchUserLists = (userId) => {
    if (userId) {
      httpClient.get(`${urls.api}/lists?userId=${userId}`)
        .then(response => {
          setUserLists(response.data);
        }).catch(e => {
          setError(e);
          setMessage(`Failed to fetch lists for user ${userId}`);
        });
    } else setUserLists([]);
  }

  const fetchEvents = async () => {
    const events = {
      tournament: [],
      league: [],
      other: []
    }

    const queriedEvents = await queryEvents()

    queriedEvents.map(event => {
      switch (event.type) {
        case "FFGOP":
          events.tournament.push(event)
          break
        case "LEAGUE":
          events.league.push(event)
          break
        case "OTHER":
          events.other.push(event)
          break
        default:
          console.log("what even is this type?", event.id, event.type)
      }
    })

    setEvents(events)
  }

  const fetchUserEvents = (auth) => {
    if (auth && auth.isAuthenticated()) {
      // TODO: call to get current user's events (pass auth.idToken)
    } else {
      setUserEvents({
        tournament: [],
        league: [],
        other: []
      })
    }
  }

  const fetchHQUserId = (email) => {
    if (email) {
      httpClient.get(`${urls.api}/users?email=${email}`)
        .then(response => {
          if (response.data.length > 0) {
            setUserId(response.data[0].userId);
          } else {
            httpClient.post(`${urls.api}/users`, { email })
            .then(creationResponse => {
              if (creationResponse.data.length > 0){
                setUserId(response.data[0].userId)
              } else {
                setError('Login failure');
                setMessage(`Tried and failed to create account with email address ${email}`);
              }
            })
            .catch(e => {
              setError('Login failure');
              setMessage(`Failed to create account with email address ${email}`);
            });
          }
        })
        .catch(e => {
          setError(e);
          setMessage(`Failed to find user with email address ${email}`);
        });
    }
  }
  if (error) return <ErrorFallback error={error} message={message} />;
  return (
    <DataContext.Provider
      value={{
        isDrawerOpen,
        auth,
        userId,
        routes,
        events,
        userLists,
        userEvents,
        userSettings,
        goToPage,
        fetchUserLists,
        fetchUserEvents,
        setUserLists,
        setUserEvents,
        setUserSettingsValue,
        setIsDrawerOpen
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
