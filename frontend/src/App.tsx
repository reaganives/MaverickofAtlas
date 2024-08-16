import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './components/pages/ProductPage';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import HomePage from './components/pages/HomePage';
import Footer from './components/Footer';
import HomeDivider from './components/HomeDivider';
import AboutPage from './components/pages/AboutPage';
import CartPage from './components/pages/CartPage';
import ItemsList from './components/ItemsList';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';
import RequestNewPassForm from './components/RequestNewPassForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
    <Router>
      <Routes>
      <Route 
        path="/productpage"
        element={
          <>
          <div className='flex flex-col justify-center min-h-screen'>
              <ProductPage />
              <HomeDivider />
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
          </div>
          </>
        }
        />
        <Route 
        path="/login"
        element={
          <UnprotectedRoute>
            <>
              <div className='flex flex-col justify-center min-h-screen'>
                <LoginPage />
                <HomeDivider />
                <div className='w-full flex justify-center mt-20'>
                  <div className='w-full max-w-screen-lg'>
                    <Footer />
                  </div>
                </div>
              </div>
            </>
          </UnprotectedRoute>
        }
      />
        <Route 
        path="/cart"
        element={
          <>
          <div className='flex flex-col justify-center min-h-screen'>
              <CartPage />
              <HomeDivider />
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
          </div>
          </>
        }
        />
        <Route 
        path="/register"
        element={
          <>
          <UnprotectedRoute>
          <div className='flex flex-col justify-center min-h-screen'>
              <RegistrationPage />
              <HomeDivider />
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
          </div>
          </UnprotectedRoute>
          </>
        }
        />
        <Route 
          path="/" 
          element={
            <>
              <div className='flex flex-col justify-center'>
                <HomePage />
                <HomeDivider />
              </div>
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
            </>
          } 
        />
        <Route 
          path="/about" 
          element={
            <>
              <div className='flex flex-col justify-center'>
                <AboutPage />
                <HomeDivider />
              </div>
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
            </>
          } 
        />
      <Route 
          path="/test" 
          element={
            <>
              <div className='flex flex-col justify-center'>
                <ItemsList />
                <HomeDivider />
              </div>
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
            </>
          } 
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/request-new-password"
        element={
          <>
          <UnprotectedRoute>
          <div className='flex flex-col justify-center min-h-screen'>
              <RequestNewPassForm />
              <HomeDivider />
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
          </div>
          </UnprotectedRoute>
          </>
        }
        />
        <Route 
        path="/reset-password/:token"
        element={
          <>
          <UnprotectedRoute>
          <div className='flex flex-col justify-center min-h-screen'>
              <ResetPasswordForm />
              <HomeDivider />
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-lg'>
                  <Footer />
                </div>
              </div>
          </div>
          </UnprotectedRoute>
          </>
        }
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;


