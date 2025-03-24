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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.log('No user signed in', error);
        navigate('/login');
      }
    };

    fetchUser();
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
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;
