import { use } from "react";

const userPoolId = import.meta.env.VITE_AWS_USER_POLL_ID;
const userPoolClientId = import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID;
const region = import.meta.env.VITE_AWS_REGION;

export const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: userPoolId,
      userPoolClientId: userPoolClientId,
      userPoolWebClientId: userPoolClientId,
      
      region: region,
      loginWith: {
        oauth: {
          redirectUrl: 'https://d2rc8zef7t00nt.cloudfront.net/',
          domain:
            'ap-southeast-1lkur7wtor.auth.ap-southeast-1.amazoncognito.com',
          scopes: ['openid','email' ,'phone'],
          // redirect_uri:"https://d2rc8zef7t00nt.cloudfront.net/",
          preferredRedirectUrl:'https://d2rc8zef7t00nt.cloudfront.net/',
          // preferredRedirectUrl:"https://jwt.io/",
         
         
          redirectSignIn:
           [
            
            'https://d2rc8zef7t00nt.cloudfront.net/',
            'http://localhost:5173/',
            
            
            
            // 'https://d2ymcql1l53g3b.cloudfront.net',
          ],
          redirectSignOut: [ 
            'https://d2rc8zef7t00nt.cloudfront.net/',
            'http://localhost:5173/',
           
            // 'https://d2ymcql1l53g3b.cloudfront.net',
          ],
          responseType: 'token',
          providers: ['Google'],
        },
        fetdarationTarget: 'COGNITO_USER_POOLS',
      },
      username: 'true',
      email: 'false', // Optional
      phone: 'false', // Optional
    },
  },
};
