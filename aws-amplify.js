const userPoolId = import.meta.env.VITE_AWS_USER_POLL_ID;
const userPoolClientId = import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID;
const region = import.meta.env.VITE_AWS_REGION;

export const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: userPoolId,
      userPoolClientId: userPoolClientId,
      region: region,
      loginWith: {
        oauth: {
          domain:
            'https://ap-southeast-1lkur7wtor.auth.ap-southeast-1.amazoncognito.com',
          scope: ['email', 'openid', 'profile'],
          redirectSignIn: [
            'http://localhost:5173/',
            'https://d2rc8zef7t00nt.cloudfront.net/',
            'https://d2ymcql1l53g3b.cloudfront.net',
          ],
          redirectSignOut: [
            'http://localhost:5173/',
            'https://d2rc8zef7t00nt.cloudfront.net/',
            'https://d2ymcql1l53g3b.cloudfront.net',
          ],
          responseType: 'code',
          providers: ['Google'],
        },
      },
      username: 'true',
      email: 'false', // Optional
      phone: 'false', // Optional
    },
  },
};
