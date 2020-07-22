const auth0URL = "legion-ops.auth0.com"

const auth = {
  all: {
    domain: auth0URL,
    audience: `https://${auth0URL}/userinfo`
  },
  dev: {
    clientID: '54C97ABCWAyyO5qQVVpUkiXEvRkS3QBW',
    redirectUri: 'http://localhost:3000/callback',
    returnTo: 'http://localhost:3000'
  },
  prod: {
    clientID: 'TvCKJz3LDnVpy6B0SuzOSP4HFIQ04XJv',
    redirectUri: 'https://legion-ops.com/callback',
    returnTo: 'https://legion-ops.com'
  }
};

export default auth;
