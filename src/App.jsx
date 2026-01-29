import Container from 'react-bootstrap/Container';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppLayout from './Components/AppLayout';
import Registerform from './Components/RegisterForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <Home />
          </AppLayout>
          } />
        <Route path="/login" element={
          <AppLayout>
            <Login />
          </AppLayout>
        } />
        <Route path="/registerf" element={
          <AppLayout>
            <Registerform/>
          </AppLayout>
        } />
      </Routes>
    </>
  )
}

export default App
