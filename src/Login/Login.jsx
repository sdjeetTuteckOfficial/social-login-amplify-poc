import { useEffect } from 'react';
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

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          console.log('User:', user);
          navigate('/');
        }
      } catch (error) {
        console.log('No user signed in', error);
      }
    };

    checkUser();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
    // try {
    //   await Auth.federatedSignIn({ provider: 'Google' });
    // } catch (error) {
    //   console.error('Google Sign-In Error:', error);
    // }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Optional: Light background for better UI
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
