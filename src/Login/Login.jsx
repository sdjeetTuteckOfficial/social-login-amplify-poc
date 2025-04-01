import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithRedirect, getCurrentUser } from 'aws-amplify/auth';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import { Hub } from "aws-amplify/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", "?")); // Convert hash to query format
    console.log("params",params);

    if (params.has("error_description")) {
      localStorage.setItem("error_description", params.get("error_description"));
      const errorMessage = decodeURIComponent(params.get("error_description")); // Decode the error message
      console.log("Error:", errorMessage);
      
      setError(errorMessage);
      // window.history.replaceState({}, document.title, "/login"); // Remove hash without reloading
    }

    if (params.has("access_token")) {
      const accessToken = params.get("access_token");
      localStorage.setItem("access_token", accessToken);
      window.history.replaceState({}, document.title, "/"); // Redirect to dashboard
      // navigate("/");
    }
  }, [navigate]);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Not signed in:", error);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload }) => {
  //     switch (payload.event) {
  //       case "signInWithRedirect":
  //         getUser();
  //         break;
  //       case "signInWithRedirect_failure":
  //         setError("An error occurred during the OAuth flow.");
  //         break;
  //       case "customOAuthState":
  //         setCustomState(payload.data);
  //         break;
  //     }
  //   });

  //   getUser();
  //   return unsubscribe;
  // }, []);

  const handleGoogleLogin = async () => {
    try {
      let goolge_response = await signInWithRedirect({ provider: 'Google' });
      localStorage.setItem("goolge_response", goolge_response);
      print("goolge_response",goolge_response);
    } catch (error) {
      // localStorage.setItem("error", error);
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth='xs'>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant='h4' align='center' gutterBottom>
              Sign In
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Button
                onClick={handleGoogleLogin}
                variant='contained'
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Continue with Google
              </Button>
              {user && <div>Welcome, {user.username}</div>}
              {error && <Typography color="error">{error}</Typography>}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
