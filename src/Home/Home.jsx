import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log("user looged in",user);
        
        setUser(user);
      } catch (error) {
        console.log('No user signed in', error);
        // navigate('/login');
      }
    };

    fetchUser();

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

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Card sx={{ mt: 5, p: 3 }}>
        <CardContent>
          <Typography variant='h4' align='center'>
            Welcome, {user?.signInDetails?.loginId || 'Guest'}!
          </Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Button onClick={handleLogout} variant='contained' color='error'>
              Sign Out
            </Button>
            <Typography variant='body2' color='error'>
              {error} 
              </Typography>
            <Typography >userId{user?.userId}</Typography>
            <Typography >username{user?.username}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;
