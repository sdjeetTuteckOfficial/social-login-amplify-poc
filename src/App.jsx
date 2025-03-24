import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home/Home';
import LoginPage from './Login/Login';

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
